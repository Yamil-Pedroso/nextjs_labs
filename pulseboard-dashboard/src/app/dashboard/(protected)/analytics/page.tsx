"use client";

import { AnalyticsCard } from "@/components/analytics-card";

export default function AnalyticsPage() {
  return (
    <section className="px-4 py-4 sm:p-6 space-y-6">
      <header>
        <h2 className="text-lg sm:text-xl font-semibold text-[rgb(var(--text))]">
          Analytics
        </h2>
        <p className="text-sm text-[rgb(var(--muted))]">
          Detailed performance metrics
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AnalyticsCard />
      </div>
    </section>
  );
}
