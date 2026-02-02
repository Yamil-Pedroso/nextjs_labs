"use client";

import { StatCard } from "@/components/stat-card";
import { AnalyticsCard } from "@/components/analytics-card";
import { RecentActivity } from "@/components/recent-activity";
import { RecentUsers } from "@/components/recent-users";
import { QuickActions } from "@/components/quick-actions";
import { useDashboardStats } from "@/hooks/use-dashboard-stats";
import {
  CurrencyDollarIcon,
  UserGroupIcon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { SystemStatus } from "@/components/system-status";
import { AccountSummary } from "@/components/account-summary";

export default function OverviewPage() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <section className="px-4 py-4 sm:p-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-24 rounded-xl bg-[rgb(var(--border))] animate-pulse"
          />
        ))}
      </section>
    );
  }

  return (
    <section className="px-4 py-4 sm:p-6 space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold text-[rgb(var(--text))]">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Revenue"
          value={`$${data!.revenue.toLocaleString()}`}
          icon={<CurrencyDollarIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
        />
        <StatCard
          title="Active Users"
          value={data!.users.toLocaleString()}
          icon={<UserGroupIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
        />
        <StatCard
          title="Growth"
          value={`+${data!.growth}%`}
          icon={<ArrowTrendingUpIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
        />
        <StatCard
          title="Sessions"
          value={data!.sessions.toLocaleString()}
          icon={<ChartBarIcon className="h-5 w-5 sm:h-6 sm:w-6" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 items-stretch">
        <div className="lg:col-span-2 flex h-full flex-col gap-4">
          <AnalyticsCard />
          <QuickActions />
          <div className="mt-auto">
            <RecentUsers />
          </div>
        </div>

        <div className="flex h-full flex-col gap-4">
          <RecentActivity />
          <SystemStatus />
          <div className="mt-auto">
            <AccountSummary />
          </div>
        </div>
      </div>
    </section>
  );
}
