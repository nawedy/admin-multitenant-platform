'use client';

import { useState } from 'react';
import { BuilderSection } from '@/lib/builder/types';
import { BuilderToolbar } from './builder-toolbar';
import { BuilderCanvas } from './builder-canvas';
import { BuilderSidebar } from './builder-sidebar';

export function VisualEditor() {
  const [sections, setSections] = useState<BuilderSection[]>([]);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleAddSection = (section: BuilderSection) => {
    setSections([...sections, section]);
  };

  const handleUpdateSection = (sectionId: string, updates: Partial<BuilderSection>) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };

  return (
    <div className="flex h-screen">
      <BuilderSidebar 
        sections={sections}
        selectedSection={selectedSection}
        onSelectSection={setSelectedSection}
      />
      <div className="flex-1 flex flex-col">
        <BuilderToolbar onAddSection={handleAddSection} />
        <BuilderCanvas
          sections={sections}
          selectedSection={selectedSection}
          onUpdateSection={handleUpdateSection}
        />
      </div>
    </div>
  );
}