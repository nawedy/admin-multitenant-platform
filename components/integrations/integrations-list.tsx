'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { APIIntegration } from '@/lib/integrations/types';
import { APIIntegrationDialog } from './api-integration-dialog';
import { DatabaseConnectionDialog } from './database-connection-dialog';
import { Switch } from '@/components/ui/switch';

export function IntegrationsList() {
  const [integrations, setIntegrations] = useState<APIIntegration[]>([]);

  const toggleIntegration = (id: string) => {
    setIntegrations(
      integrations.map((integration) =>
        integration.id === id
          ? { ...integration, enabled: !integration.enabled }
          : integration
      )
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            API Integrations
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your external service connections.
          </p>
        </div>
        <div className="space-x-2">
          <DatabaseConnectionDialog />
          <APIIntegrationDialog />
        </div>
      </div>

      <div className="grid gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {integration.name}
              </CardTitle>
              <Switch
                checked={integration.enabled}
                onCheckedChange={() => toggleIntegration(integration.id)}
              />
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                Type: {integration.type}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}