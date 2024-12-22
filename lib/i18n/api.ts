import { supabase } from '@/lib/supabase/client';
import type { Translation, TranslationRequest } from './types';

export async function getTranslation(
  siteId: string,
  contentType: string,
  contentId: string,
  language: string
): Promise<Translation | null> {
  const { data, error } = await supabase
    .from('translations')
    .select('*')
    .eq('site_id', siteId)
    .eq('content_type', contentType)
    .eq('content_id', contentId)
    .eq('language', language)
    .single();

  if (error) throw error;
  return data;
}

export async function createTranslation(request: TranslationRequest): Promise<Translation> {
  const { data, error } = await supabase
    .from('translations')
    .insert({
      site_id: request.siteId,
      content_type: request.contentType,
      content_id: request.contentId,
      language: request.targetLanguage,
      content: request.content,
      status: 'draft'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTranslation(
  id: string,
  content: Record<string, any>,
  status: 'draft' | 'published' = 'draft'
): Promise<Translation> {
  const { data, error } = await supabase
    .from('translations')
    .update({ content, status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}