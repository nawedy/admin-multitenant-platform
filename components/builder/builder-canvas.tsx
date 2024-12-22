'use client';

import { BuilderSection } from '@/lib/builder/types';
import { BuilderBlock } from './builder-block';

interface BuilderCanvasProps {
  sections: BuilderSection[];
  selectedSection: string | null;
  onUpdateSection: (sectionId: string, updates: Partial<BuilderSection>) => void;
}

export function BuilderCanvas({ 
  sections, 
  selectedSection,
  onUpdateSection 
}: BuilderCanvasProps) {
  return (
    <div className="flex-1 overflow-auto bg-gray-50 p-4">
      <div className="mx-auto max-w-5xl">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`mb-4 rounded-lg border-2 ${
              selectedSection === section.id ? 'border-primary' : 'border-transparent'
            }`}
            style={section.settings}
          >
            {section.blocks.map((block) => (
              <BuilderBlock
                key={block.id}
                block={block}
                isEditing={selectedSection === section.id}
                onUpdate={(updates) => {
                  onUpdateSection(section.id, {
                    blocks: section.blocks.map((b) =>
                      b.id === block.id ? { ...b, ...updates } : b
                    ),
                  });
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}