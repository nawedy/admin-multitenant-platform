'use client';

import { AnalyticsChart } from './analytics-chart';

const monthlyUsers = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 700 },
];

const revenue = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 1398 },
  { name: 'Mar', value: 9800 },
  { name: 'Apr', value: 3908 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 3800 },
];

export function AnalyticsDashboard() {
  return (
    <div className="grid gap-6">
      <AnalyticsChart
        data={monthlyUsers}
        title="User Growth"
        description="Monthly active users over time"
      />
      <AnalyticsChart
        data={revenue}
        title="Revenue"
        description="Monthly revenue in USD"
      />
    </div>
  );
}