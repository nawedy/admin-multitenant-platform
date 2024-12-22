import { supabase } from './client';
import type { SiteUser, User } from './types';

export async function getSiteMembers(siteId: string) {
  const { data, error } = await supabase
    .from('site_users')
    .select(`
      role,
      users (
        id,
        name,
        email,
        avatar_url
      )
    `)
    .eq('site_id', siteId);

  if (error) throw error;
  return data;
}

export async function inviteMember(siteId: string, email: string, role: SiteUser['role']) {
  const { data: user, error: userError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single();

  if (userError) throw userError;

  const { error } = await supabase
    .from('site_users')
    .insert({
      site_id: siteId,
      user_id: user.id,
      role
    });

  if (error) throw error;
}

export async function updateMemberRole(siteId: string, userId: string, role: SiteUser['role']) {
  const { error } = await supabase
    .from('site_users')
    .update({ role })
    .eq('site_id', siteId)
    .eq('user_id', userId);

  if (error) throw error;
}

export async function removeMember(siteId: string, userId: string) {
  const { error } = await supabase
    .from('site_users')
    .delete()
    .eq('site_id', siteId)
    .eq('user_id', userId);

  if (error) throw error;
}