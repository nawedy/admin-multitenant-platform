'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, Users, Settings } from 'lucide-react';
import Link from 'next/link';
import type { Site } from '@/lib/supabase/types';

interface SiteCardProps {
  site: Site;
}

export function SiteCard({ site }: SiteCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          {site.logo_url ? (
            <img
              src={site.logo_url}
              alt={site.name}
              className="h-12 w-12 rounded-full"
            />
          ) : (
            <Globe className="h-12 w-12" />
          )}
          <div>
            <h3 className="font-semibold">{site.name}</h3>
            <p className="text-sm text-muted-foreground">
              {site.subdomain}.yourdomain.com
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/sites/${site.id}/members`}>
            <Users className="mr-2 h-4 w-4" />
            Members
          </Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/sites/${site.id}/settings`}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}