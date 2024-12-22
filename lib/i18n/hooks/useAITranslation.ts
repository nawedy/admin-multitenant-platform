import { useState } from 'react';
import { AIService } from '@/lib/ai/service';

interface TranslationParams {
  content: Record<string, any>;
  sourceLanguage: string;
  targetLanguage: string;
}

export function useAITranslation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const translateWithAI = async ({
    content,
    sourceLanguage,
    targetLanguage
  }: TranslationParams): Promise<Record<string, any>> => {
    setLoading(true);
    setError(null);

    try {
      const translatedContent = await AIService.translateContent({
        content,
        sourceLanguage,
        targetLanguage
      });

      return translatedContent;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Translation failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    translateWithAI,
    loading,
    error
  };
}