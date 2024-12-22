'use client';

import { useState } from 'react';
import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import { AIToolsMenu } from '@/components/ai/ai-tools-menu';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className={`fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block ${sidebarOpen ? '!block' : ''}`}>
          <Sidebar />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">
          <div className="mb-4 flex justify-end">
            <AIToolsMenu />
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}