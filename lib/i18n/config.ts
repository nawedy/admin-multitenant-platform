import { Language } from './types';

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'am', name: 'አማርኛ', dir: 'ltr' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
];

export const DEFAULT_LANGUAGE = 'en';