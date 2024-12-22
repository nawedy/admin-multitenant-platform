/*
  # Add Site Builder and Integration Features

  1. New Tables
    - `site_blocks` - Reusable building blocks for site construction
      - `id` (uuid, primary key)
      - `site_id` (uuid, foreign key)
      - `type` (text) - Type of block (hero, features, etc)
      - `content` (jsonb) - Block content and configuration
      - `style` (jsonb) - Block styling
      - `order` (integer) - Display order
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `site_integrations` - External service integrations
      - `id` (uuid, primary key)
      - `site_id` (uuid, foreign key)
      - `name` (text) - Integration name
      - `type` (text) - Integration type (unsplash, openai, etc)
      - `config` (jsonb) - Integration configuration
      - `enabled` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on new tables
    - Add policies for site owners and admins
*/

-- Site Blocks table
CREATE TABLE IF NOT EXISTS site_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
  type text NOT NULL,
  content jsonb DEFAULT '{}',
  style jsonb DEFAULT '{}',
  "order" integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Site Integrations table
CREATE TABLE IF NOT EXISTS site_integrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  config jsonb DEFAULT '{}',
  enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE site_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_integrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for site_blocks
CREATE POLICY "Site owners and admins can manage blocks"
  ON site_blocks
  USING (
    EXISTS (
      SELECT 1 FROM site_users
      WHERE site_users.site_id = site_blocks.site_id
      AND site_users.user_id = auth.uid()
      AND site_users.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Site members can view blocks"
  ON site_blocks
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM site_users
      WHERE site_users.site_id = site_blocks.site_id
      AND site_users.user_id = auth.uid()
    )
  );

-- RLS Policies for site_integrations
CREATE POLICY "Site owners and admins can manage integrations"
  ON site_integrations
  USING (
    EXISTS (
      SELECT 1 FROM site_users
      WHERE site_users.site_id = site_integrations.site_id
      AND site_users.user_id = auth.uid()
      AND site_users.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Site members can view integrations"
  ON site_integrations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM site_users
      WHERE site_users.site_id = site_integrations.site_id
      AND site_users.user_id = auth.uid()
    )
  );

-- Update triggers
CREATE TRIGGER site_blocks_updated_at
  BEFORE UPDATE ON site_blocks
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER site_integrations_updated_at
  BEFORE UPDATE ON site_integrations
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();