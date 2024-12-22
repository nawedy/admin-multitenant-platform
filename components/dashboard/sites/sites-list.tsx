'use client';

import { useEffect, useState } from 'react';
import { listSites } from '@/lib/supabase/sites';
import { useToast } from '@/hooks/use-toast';
import { SiteCard } from './site-card';
import type { Site } from '@/lib/supabase/types';

export function SitesList() {
  const [sites, setSites] = useState<Site[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      const data = await listSites();
      setSites(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load sites',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading sites...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sites.map((site) => (
        <SiteCard key={site.id} site={site} />
      ))}
    </div>
  );
}