'use client';

import { Button } from '@/components/ui/button';
import { ImportDialog } from './import-dialog';
import { Plus, Download, Upload, Undo, Redo } from 'lucide-react';

interface BuilderToolbarProps {
  onAddSection: (section: any) => void;
}

export function BuilderToolbar({ onAddSection }: BuilderToolbarProps) {
  return (
    <div className="border-b p-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm">
          <Undo className="h-4 w-4 mr-1" />
          Undo
        </Button>
        <Button variant="outline" size="sm">
          <Redo className="h-4 w-4 mr-1" />
          Redo
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <ImportDialog />
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
        <Button variant="default" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add Section
        </Button>
      </div>
    </div>
  );
}