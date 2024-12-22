import { AnalyticsDashboard } from '@/components/dashboard/analytics/analytics-dashboard';

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
      <AnalyticsDashboard />
    </div>
  );
}