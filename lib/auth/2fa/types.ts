export interface TwoFactorAuth {
  enabled: boolean;
  recoveryEmail: string | null;
  backupCodes: string[];
}

export interface TOTPSetup {
  secret: string;
  qrCode: string;
  backupCodes: string[];
}

export interface VerifyTOTPParams {
  userId: string;
  code: string;
}