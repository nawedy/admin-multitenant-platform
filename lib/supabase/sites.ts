import { supabase } from './client';
import type { Site } from './types';

export async function createSite(data: {
  name: string;
  subdomain: string;
  description?: string;
}) {
  const { data: site, error } = await supabase
    .from('sites')
    .insert({
      name: data.name,
      subdomain: data.subdomain.toLowerCase(),
      description: data.description,
    })
    .select()
    .single();

  if (error) throw error;
  return site as Site;
}

export async function listSites() {
  const { data, error } = await supabase
    .from('sites')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Site[];
}

export async function validateSubdomain(subdomain: string) {
  const { count, error } = await supabase
    .from('sites')
    .select('id', { count: 'exact' })
    .eq('subdomain', subdomain.toLowerCase());

  if (error) throw error;
  return count === 0;
}