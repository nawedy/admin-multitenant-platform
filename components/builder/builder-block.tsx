'use client';

import { BuilderBlock as BlockType } from '@/lib/builder/types';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BuilderBlockProps {
  block: BlockType;
  isEditing: boolean;
  onUpdate: (updates: Partial<BlockType>) => void;
}

export function BuilderBlock({ block, isEditing, onUpdate }: BuilderBlockProps) {
  const handleContentChange = (key: string, value: string) => {
    onUpdate({
      content: { ...block.content, [key]: value },
    });
  };

  return (
    <Card className="p-4">
      {isEditing ? (
        <div className="space-y-4">
          {Object.entries(block.content).map(([key, value]) => (
            <div key={key}>
              <Label>{key}</Label>
              <Input
                value={value as string}
                onChange={(e) => handleContentChange(key, e.target.value)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: block.content.html || '' }} />
      )}
    </Card>
  );
}