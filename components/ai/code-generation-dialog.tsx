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
import { Wand2 } from 'lucide-react';

export function CodeGenerationDialog() {
  const [description, setDescription] = useState('');
  const [result, setResult] = useState('');
  const { generateCode, loading, error } = useAIAssistant();

  const handleGenerate = async () => {
    const suggestion = await generateCode(description);
    if (suggestion) {
      setResult(`// ${suggestion.path}\n\n${suggestion.code}\n\n/* Explanation:\n${suggestion.explanation}\n*/`);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Wand2 className="mr-2 h-4 w-4" />
          AI Generate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Generate Code with AI</DialogTitle>
          <DialogDescription>
            Describe what you want to create and let AI generate the code for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="Describe the code you want to generate..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          <Button onClick={handleGenerate} disabled={loading || !description}>
            {loading ? 'Generating...' : 'Generate Code'}
          </Button>
          {error && <p className="text-sm text-destructive">{error}</p>}
          {result && (
            <Textarea
              value={result}
              readOnly
              className="font-mono text-sm"
              rows={10}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}