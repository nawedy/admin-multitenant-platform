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
import { BookOpen } from 'lucide-react';

export function CodeExplanationDialog() {
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const { explainCode, loading, error } = useAIAssistant();

  const handleExplain = async () => {
    const result = await explainCode(code);
    if (result) {
      setExplanation(result);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <BookOpen className="mr-2 h-4 w-4" />
          Explain Code
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Get Code Explanation</DialogTitle>
          <DialogDescription>
            Paste your code to get a detailed explanation of how it works.
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
          <Button onClick={handleExplain} disabled={loading || !code}>
            {loading ? 'Analyzing...' : 'Explain Code'}
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {explanation && (
            <div className="rounded-md bg-muted p-4">
              <h4 className="mb-2 font-medium">Explanation:</h4>
              <p className="whitespace-pre-wrap text-sm">{explanation}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}