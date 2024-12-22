'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TwoFactorAuthService } from '@/lib/auth/2fa/service';
import { useToast } from '@/hooks/use-toast';

interface TwoFactorVerifyProps {
  userId: string;
  onVerified: () => void;
}

export function TwoFactorVerify({ userId, onVerified }: TwoFactorVerifyProps) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    try {
      setLoading(true);
      const verified = await TwoFactorAuthService.verifyTOTP({
        userId,
        code
      });

      if (verified) {
        onVerified();
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

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Two-Factor Authentication Code</Label>
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
          maxLength={6}
        />
      </div>
      <Button onClick={handleVerify} disabled={loading || code.length !== 6}>
        {loading ? 'Verifying...' : 'Verify'}
      </Button>
    </div>
  );
}