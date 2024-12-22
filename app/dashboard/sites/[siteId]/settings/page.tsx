import { SiteSettingsForm } from '@/components/dashboard/sites/settings/site-settings-form';
import { SiteDangerZone } from '@/components/dashboard/sites/settings/site-danger-zone';

export default function SiteSettingsPage({ params }: { params: { siteId: string } }) {
  return (
    <div className="flex-1 space-y-6 p-4 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
      <div className="grid gap-6">
        <SiteSettingsForm siteId={params.siteId} />
        <SiteDangerZone siteId={params.siteId} />
      </div>
    </div>
  );
}