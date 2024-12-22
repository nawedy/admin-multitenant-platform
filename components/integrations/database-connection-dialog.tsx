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
import { Switch } from '@/components/ui/switch';
import { DatabaseConfig } from '@/lib/integrations/types';
import { Database } from 'lucide-react';

export function DatabaseConnectionDialog() {
  const [config, setConfig] = useState<Partial<DatabaseConfig>>({
    type: 'postgres',
  });

  const handleConnect = async () => {
    // Database connection logic
    console.log('Connecting to database:', config);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Database className="mr-2 h-4 w-4" />
          Connect Database
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Connect to Database</DialogTitle>
          <DialogDescription>
            Configure your database connection.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Database Type</Label>
            <Select
              value={config.type}
              onValueChange={(value: DatabaseConfig['type']) =>
                setConfig({ ...config, type: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select database type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="postgres">PostgreSQL</SelectItem>
                <SelectItem value="mysql">MySQL</SelectItem>
                <SelectItem value="mongodb">MongoDB</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Host</Label>
            <Input
              value={config.host || ''}
              onChange={(e) => setConfig({ ...config, host: e.target.value })}
              placeholder="localhost"
            />
          </div>

          <div className="grid gap-2">
            <Label>Port</Label>
            <Input
              type="number"
              value={config.port || ''}
              onChange={(e) =>
                setConfig({ ...config, port: parseInt(e.target.value, 10) })
              }
              placeholder="5432"
            />
          </div>

          <div className="grid gap-2">
            <Label>Database Name</Label>
            <Input
              value={config.database || ''}
              onChange={(e) => setConfig({ ...config, database: e.target.value })}
              placeholder="mydatabase"
            />
          </div>

          <div className="grid gap-2">
            <Label>Username</Label>
            <Input
              value={config.username || ''}
              onChange={(e) => setConfig({ ...config, username: e.target.value })}
              placeholder="username"
            />
          </div>

          <div className="grid gap-2">
            <Label>Password</Label>
            <Input
              type="password"
              onChange={(e) => setConfig({ ...config, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between">
            <Label>Use SSL</Label>
            <Switch
              checked={config.ssl}
              onCheckedChange={(checked) => setConfig({ ...config, ssl: checked })}
            />
          </div>

          <Button onClick={handleConnect}>Connect</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}