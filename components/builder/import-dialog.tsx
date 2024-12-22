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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, FileCode } from 'lucide-react';

export function ImportDialog() {
  const [loading, setLoading] = useState(false);

  const handleFigmaImport = async () => {
    setLoading(true);
    // Implement Figma import logic
    setLoading(false);
  };

  const handleCanvaImport = async () => {
    setLoading(true);
    // Implement Canva import logic
    setLoading(false);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Upload className="h-4 w-4 mr-1" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Design</DialogTitle>
          <DialogDescription>
            Import your design from Figma or Canva
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="figma">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="figma">Figma</TabsTrigger>
            <TabsTrigger value="canva">Canva</TabsTrigger>
          </TabsList>
          <TabsContent value="figma" className="space-y-4">
            <Button 
              onClick={handleFigmaImport} 
              disabled={loading}
              className="w-full"
            >
              <FileCode className="h-4 w-4 mr-2" />
              Connect to Figma
            </Button>
          </TabsContent>
          <TabsContent value="canva" className="space-y-4">
            <Button 
              onClick={handleCanvaImport} 
              disabled={loading}
              className="w-full"
            >
              <FileCode className="h-4 w-4 mr-2" />
              Connect to Canva
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}