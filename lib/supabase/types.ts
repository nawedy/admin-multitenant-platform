export type Site = {
  id: string;
  name: string;
  subdomain: string;
  custom_domain: string | null;
  description: string | null;
  logo_url: string | null;
  theme: {
    primary_color: string;
  };
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
  name: string | null;
  email: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
};

export type SiteUser = {
  site_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type Post = {
  id: string;
  site_id: string;
  author_id: string;
  title: string;
  content: string | null;
  slug: string;
  published: boolean;
  created_at: string;
  updated_at: string;
};