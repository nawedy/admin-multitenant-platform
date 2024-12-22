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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { APIIntegration } from '@/lib/integrations/types';
import { Plus } from 'lucide-react';

export function APIIntegrationDialog() {
  const [integration, setIntegration] = useState<Partial<APIIntegration>>({
    type: 'unsplash',
  });

  const handleSave = async () => {
    // Save integration logic
    console.log('Saving integration:', integration);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add API Integration</DialogTitle>
          <DialogDescription>
            Connect to external services and databases.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Integration Type</Label>
            <Select
              value={integration.type}
              onValueChange={(value: APIIntegration['type']) =>
                setIntegration({ ...integration, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unsplash">Unsplash</SelectItem>
                <SelectItem value="openai">OpenAI</SelectItem>
                <SelectItem value="database">Database</SelectItem>
                <SelectItem value="custom">Custom API</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              value={integration.name || ''}
              onChange={(e) =>
                setIntegration({ ...integration, name: e.target.value })
              }
              placeholder="Integration name"
            />
          </div>

          <div className="grid gap-2">
            <Label>API Key</Label>
            <Input
              type="password"
              placeholder="Enter API key"
              onChange={(e) =>
                setIntegration({
                  ...integration,
                  config: { ...integration.config, apiKey: e.target.value },
                })
              }
            />
          </div>

          <Button onClick={handleSave}>Save Integration</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}