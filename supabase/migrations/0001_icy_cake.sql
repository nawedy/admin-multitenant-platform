/*
  # Multi-tenant Platform Schema

  1. New Tables
    - `sites`
      - Core table for tenant sites
      - Stores domain, subdomain, and site settings
    - `users`
      - Extended user table with role management
    - `posts`
      - Content table for tenant blog posts
    - `site_users`
      - Junction table for site memberships

  2. Security
    - RLS policies for all tables
    - Site-based access control
*/

-- Sites table
CREATE TABLE IF NOT EXISTS sites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  subdomain text NOT NULL UNIQUE,
  custom_domain text UNIQUE,
  description text,
  logo_url text,
  theme jsonb DEFAULT '{"primary_color": "#000000"}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text,
  email text NOT NULL UNIQUE,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Site memberships
CREATE TABLE IF NOT EXISTS site_users (
  site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
  created_at timestamptz DEFAULT now(),
  PRIMARY KEY (site_id, user_id)
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id uuid REFERENCES sites(id) ON DELETE CASCADE,
  author_id uuid REFERENCES users(id),
  title text NOT NULL,
  content text,
  slug text NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(site_id, slug)
);

-- Enable RLS
ALTER TABLE sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Public sites are viewable by everyone" ON sites
  FOR SELECT USING (true);

CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Site members can view posts" ON posts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM site_users
      WHERE site_users.site_id = posts.site_id
      AND site_users.user_id = auth.uid()
    )
    OR published = true
  );

CREATE POLICY "Site admins can manage posts" ON posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM site_users
      WHERE site_users.site_id = posts.site_id
      AND site_users.user_id = auth.uid()
      AND site_users.role IN ('owner', 'admin')
    )
  );

-- Functions
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER sites_updated_at
  BEFORE UPDATE ON sites
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE PROCEDURE handle_updated_at();