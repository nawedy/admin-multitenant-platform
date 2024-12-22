export interface Language {
  code: string;
  name: string;
  dir: 'ltr' | 'rtl';
}

export interface Translation {
  id: string;
  siteId: string;
  contentType: string;
  contentId: string;
  language: string;
  content: Record<string, any>;
  status: 'draft' | 'published';
}

export interface TranslationRequest {
  siteId: string;
  contentType: string;
  contentId: string;
  sourceLanguage: string;
  targetLanguage: string;
  content: Record<string, any>;
}