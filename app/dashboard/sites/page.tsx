import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SitesList } from '@/components/dashboard/sites/sites-list';
import { CreateSiteButton } from '@/components/dashboard/sites/create-site-button';

export default function SitesPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Sites</h2>
        <CreateSiteButton />
      </div>
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>All Sites</CardTitle>
            <CardDescription>
              Manage all tenant sites from one place.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SitesList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}