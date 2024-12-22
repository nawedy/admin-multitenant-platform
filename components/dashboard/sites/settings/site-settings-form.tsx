'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { updateSite, getSite } from '@/lib/supabase/sites';
import { Site } from '@/lib/supabase/types';

export function SiteSettingsForm({ siteId }: { siteId: string }) {
  const [site, setSite] = useState<Site | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useState(() => {
    getSite(siteId).then(setSite);
  }, [siteId]);

  if (!site) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const updates = {
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        custom_domain: formData.get('custom_domain') as string,
      };

      await updateSite(siteId, updates);
      toast({ title: 'Settings updated' });
      router.refresh();
    } catch (error) {
      toast({ 
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>
          Update your site settings and configuration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Site Name</Label>
            <Input
              id="name"
              name="name"
              defaultValue={site.name}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={site.description || ''}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="custom_domain">Custom Domain</Label>
            <Input
              id="custom_domain"
              name="custom_domain"
              defaultValue={site.custom_domain || ''}
              placeholder="example.com"
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}