'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createSite, validateSubdomain } from '@/lib/supabase/sites';
import { isValidSubdomain, sanitizeSubdomain } from '@/lib/utils/validation';

export function CreateSiteForm() {
  const [loading, setLoading] = useState(false);
  const [subdomainError, setSubdomainError] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubdomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeSubdomain(e.target.value);
    e.target.value = value;
    setSubdomainError('');

    if (value && !isValidSubdomain(value)) {
      setSubdomainError(
        'Subdomain must be between 3-32 characters and can only contain letters, numbers, and hyphens'
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSubdomainError('');

    try {
      const formData = new FormData(e.currentTarget);
      const subdomain = sanitizeSubdomain(formData.get('subdomain') as string);

      if (!isValidSubdomain(subdomain)) {
        setSubdomainError('Invalid subdomain format');
        return;
      }

      const isAvailable = await validateSubdomain(subdomain);
      if (!isAvailable) {
        setSubdomainError('This subdomain is already taken');
        return;
      }

      const site = await createSite({
        name: formData.get('name') as string,
        subdomain,
        description: formData.get('description') as string,
      });

      toast({ title: 'Site created successfully' });
      router.push(`/dashboard/sites/${site.id}/settings`);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create site',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Site Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="My Awesome Site"
          required
          minLength={3}
          maxLength={64}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subdomain">Subdomain</Label>
        <div className="flex items-center space-x-2">
          <Input
            id="subdomain"
            name="subdomain"
            placeholder="my-site"
            required
            onChange={handleSubdomainChange}
          />
          <span className="text-muted-foreground">.yourdomain.com</span>
        </div>
        {subdomainError && (
          <p className="text-sm text-destructive">{subdomainError}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Brief description of your site"
          rows={3}
        />
      </div>
      <Button type="submit" disabled={loading || !!subdomainError}>
        {loading ? 'Creating...' : 'Create Site'}
      </Button>
    </form>
  );
}