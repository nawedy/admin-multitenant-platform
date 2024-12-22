import { useState } from 'react';
import { AIService } from '../service';
import { CodeSuggestion } from '../types';

export function useAIAssistant() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateCode = async (description: string): Promise<CodeSuggestion | null> => {
    setLoading(true);
    setError(null);
    try {
      return await AIService.generateCode(description);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate code');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const explainCode = async (code: string): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      return await AIService.explainCode(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to explain code');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const suggestImprovements = async (code: string): Promise<string | null> => {
    setLoading(true);
    setError(null);
    try {
      return await AIService.suggestImprovements(code);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to suggest improvements');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    generateCode,
    explainCode,
    suggestImprovements,
    loading,
    error,
  };
}