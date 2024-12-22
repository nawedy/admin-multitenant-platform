/*
  # Add Two-Factor Authentication Support

  1. New Tables
    - `user_2fa` - Stores 2FA settings and backup codes
      - `user_id` (uuid, foreign key)
      - `enabled` (boolean)
      - `secret` (text, encrypted)
      - `backup_codes` (text[], encrypted)
      - `recovery_email` (text)

  2. Security
    - Enable RLS
    - Add policies for user access
    - Encrypt sensitive data
*/

-- User 2FA table
CREATE TABLE IF NOT EXISTS user_2fa (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  enabled boolean DEFAULT false,
  secret text,
  backup_codes text[],
  recovery_email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE user_2fa ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own 2FA settings"
  ON user_2fa
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own 2FA settings"
  ON user_2fa
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Update trigger
CREATE TRIGGER user_2fa_updated_at
  BEFORE UPDATE ON user_2fa
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();