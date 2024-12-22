import { authenticator } from 'otplib';
import { supabase } from '@/lib/supabase/client';
import type { TOTPSetup, VerifyTOTPParams } from './types';

export class TwoFactorAuthService {
  static async setupTOTP(userId: string): Promise<TOTPSetup> {
    // Generate secret
    const secret = authenticator.generateSecret();
    
    // Generate backup codes
    const backupCodes = Array.from({ length: 10 }, () => 
      Math.random().toString(36).substr(2, 8).toUpperCase()
    );

    // Save to database
    await supabase.from('user_2fa').upsert({
      user_id: userId,
      secret,
      backup_codes: backupCodes,
      enabled: false
    });

    // Generate QR code data
    const otpauth = authenticator.keyuri(
      userId,
      'Your App Name',
      secret
    );

    return {
      secret,
      qrCode: otpauth,
      backupCodes
    };
  }

  static async verifyTOTP({ userId, code }: VerifyTOTPParams): Promise<boolean> {
    const { data: user2fa } = await supabase
      .from('user_2fa')
      .select('secret, backup_codes')
      .eq('user_id', userId)
      .single();

    if (!user2fa) return false;

    // Check if it's a backup code
    if (user2fa.backup_codes.includes(code)) {
      // Remove used backup code
      const newBackupCodes = user2fa.backup_codes.filter(c => c !== code);
      await supabase
        .from('user_2fa')
        .update({ backup_codes: newBackupCodes })
        .eq('user_id', userId);
      return true;
    }

    // Verify TOTP code
    return authenticator.verify({
      token: code,
      secret: user2fa.secret
    });
  }

  static async enable2FA(userId: string): Promise<void> {
    await supabase
      .from('user_2fa')
      .update({ enabled: true })
      .eq('user_id', userId);
  }

  static async disable2FA(userId: string): Promise<void> {
    await supabase
      .from('user_2fa')
      .update({ enabled: false })
      .eq('user_id', userId);
  }
}