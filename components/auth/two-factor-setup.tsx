'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TwoFactorAuthService } from '@/lib/auth/2fa/service';
import { useToast } from '@/hooks/use-toast';
import QRCode from 'qrcode.react';
import type { TOTPSetup } from '@/lib/auth/2fa/types';

interface TwoFactorSetupProps {
  userId: string;
  onComplete: () => void;
}

export function TwoFactorSetup({ userId, onComplete }: TwoFactorSetupProps) {
  const [setup, setSetup] = useState<TOTPSetup | null>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSetup = async () => {
    try {
      setLoading(true);
      const setupData = await TwoFactorAuthService.setupTOTP(userId);
      setSetup(setupData);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to setup 2FA',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    try {
      setLoading(true);
      const verified = await TwoFactorAuthService.verifyTOTP({
        userId,
        code
      });

      if (verified) {
        await TwoFactorAuthService.enable2FA(userId);
        toast({ title: '2FA Enabled Successfully' });
        onComplete();
      } else {
        toast({
          title: 'Invalid Code',
          description: 'Please try again',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify code',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!setup) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Enable Two-Factor Authentication</h2>
        <p className="text-sm text-muted-foreground">
          Enhance your account security by enabling 2FA.
        </p>
        <Button onClick={handleSetup} disabled={loading}>
          {loading ? 'Setting up...' : 'Set up 2FA'}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Scan QR Code</h2>
        <p className="text-sm text-muted-foreground">
          Scan this QR code with your authenticator app.
        </p>
        <div className="flex justify-center p-4 bg-white rounded-lg">
          <QRCode value={setup.qrCode} size={200} />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Verification Code</Label>
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter 6-digit code"
            maxLength={6}
          />
        </div>
        <Button onClick={handleVerify} disabled={loading || code.length !== 6}>
          {loading ? 'Verifying...' : 'Verify & Enable 2FA'}
        </Button>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">Backup Codes</h3>
        <p className="text-sm text-muted-foreground">
          Save these backup codes in a secure place. You can use them to access your account if you lose your authenticator device.
        </p>
        <div className="grid grid-cols-2 gap-2">
          {setup.backupCodes.map((code, i) => (
            <code key={i} className="p-2 bg-muted rounded text-sm font-mono">
              {code}
            </code>
          ))}
        </div>
      </div>
    </div>
  );
}