import { DashboardSettings } from '@/components/dashboard/settings/dashboard-settings';

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
      <DashboardSettings />
    </div>
  );
}