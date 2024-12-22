'use client';

import { BuilderSection } from '@/lib/builder/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronRight, Layout, Palette, Settings } from 'lucide-react';

interface BuilderSidebarProps {
  sections: BuilderSection[];
  selectedSection: string | null;
  onSelectSection: (sectionId: string | null) => void;
}

export function BuilderSidebar({
  sections,
  selectedSection,
  onSelectSection,
}: BuilderSidebarProps) {
  return (
    <div className="w-64 border-r bg-background">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Page Builder</h2>
      </div>
      <div className="flex flex-col h-full">
        <div className="flex-1">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              {sections.map((section) => (
                <Button
                  key={section.id}
                  variant={selectedSection === section.id ? 'secondary' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => onSelectSection(section.id)}
                >
                  <Layout className="h-4 w-4 mr-2" />
                  Section {section.id}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="p-4 border-t space-y-2">
          <Button variant="outline" className="w-full justify-start">
            <Palette className="h-4 w-4 mr-2" />
            Theme
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
}