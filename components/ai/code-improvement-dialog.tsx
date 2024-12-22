'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useAIAssistant } from '@/lib/ai/hooks/useAIAssistant';
import { Sparkles } from 'lucide-react';

export function CodeImprovementDialog() {
  const [code, setCode] = useState('');
  const [suggestions, setSuggestions] = useState('');
  const { suggestImprovements, loading, error } = useAIAssistant();

  const handleImprove = async () => {
    const result = await suggestImprovements(code);
    if (result) {
      setSuggestions(result);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Sparkles className="mr-2 h-4 w-4" />
          Improve Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Get Code Improvements</DialogTitle>
          <DialogDescription>
            Paste your code to get AI-powered suggestions for improvements.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Paste your code here..."
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={6}
            className="font-mono text-sm"
          />
          <Button onClick={handleImprove} disabled={loading || !code}>
            {loading ? 'Analyzing...' : 'Get Suggestions'}
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {suggestions && (
            <div className="rounded-md bg-muted p-4">
              <h4 className="mb-2 font-medium">Suggested Improvements:</h4>
              <p className="whitespace-pre-wrap text-sm">{suggestions}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}