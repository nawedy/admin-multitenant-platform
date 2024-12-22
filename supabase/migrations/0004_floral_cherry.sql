/*
  # Add Language Support

  1. New Tables
    - `site_languages` - Supported languages for each site
      - `site_id` (uuid, foreign key)
      - `language_code` (text) - ISO language code
      - `is_default` (boolean)
      - `is_active` (boolean)

    - `translations` - Content translations
      - `id` (uuid, primary key)
      - `site_id` (uuid, foreign key)
      - `content_type` (text) - Type of content being translated
      - `content_id` (uuid) - ID of the content being translated
      - `language` (text) - ISO language code
      - `content` (jsonb) - Translated content
      - `status` (text) - Translation status

  2. Security
    - Enable RLS
    - Add policies for site owners and translators
*/

-- Site Languages table
CREATE TABLE IF NOT EXISTS site_languages (
  site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
  language_code text NOT NULL,
  is_default boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (site_id, language_code)
);

-- Translations table
CREATE TABLE IF NOT EXISTS translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
  content_type text NOT NULL,
  content_id uuid NOT NULL,
  language text NOT NULL,
  content jsonb NOT NULL,
  status text NOT NULL DEFAULT 'draft',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE site_languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Site members can view languages"
  ON site_languages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM site_users
      WHERE site_users.site_id = site_languages.site_id
      AND site_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Site admins can manage languages"
  ON site_languages
  USING (
    EXISTS (
      SELECT 1 FROM site_users
      WHERE site_users.site_id = site_languages.site_id
      AND site_users.user_id = auth.uid()
      AND site_users.role IN ('owner', 'admin')
    )
  );

CREATE POLICY "Site members can view translations"
  ON translations
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM site_users
      WHERE site_users.site_id = translations.site_id
      AND site_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Site admins can manage translations"
  ON translations
  USING (
    EXISTS (
      SELECT 1 FROM site_users
      WHERE site_users.site_id = translations.site_id
      AND site_users.user_id = auth.uid()
      AND site_users.role IN ('owner', 'admin')
    )
  );

-- Update trigger for translations
CREATE TRIGGER translations_updated_at
  BEFORE UPDATE ON translations
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();