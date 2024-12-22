import { useState, useEffect } from 'react';
import { getTranslation, createTranslation } from '../api';
import { useAITranslation } from './useAITranslation';
import type { Translation } from '../types';

export function useTranslation(
  siteId: string,
  contentType: string,
  contentId: string,
  language: string
) {
  const [translation, setTranslation] = useState<Translation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { translateWithAI } = useAITranslation();

  useEffect(() => {
    loadTranslation();
  }, [siteId, contentType, contentId, language]);

  const loadTranslation = async () => {
    try {
      setLoading(true);
      const data = await getTranslation(siteId, contentType, contentId, language);
      setTranslation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load translation');
    } finally {
      setLoading(false);
    }
  };

  const translate = async (sourceContent: Record<string, any>, sourceLanguage: string) => {
    try {
      setLoading(true);
      
      // First try AI translation
      const aiTranslation = await translateWithAI({
        content: sourceContent,
        sourceLanguage,
        targetLanguage: language
      });

      // Save the translation
      const savedTranslation = await createTranslation({
        siteId,
        contentType,
        contentId,
        sourceLanguage,
        targetLanguage: language,
        content: aiTranslation
      });

      setTranslation(savedTranslation);
      return savedTranslation;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to translate');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    translation,
    loading,
    error,
    translate,
    refresh: loadTranslation
  };
}