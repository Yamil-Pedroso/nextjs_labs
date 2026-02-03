"use client";

import { exportRevenueCSV, exportRevenuePDF } from "@/lib/export";
import { REVENUE } from "@/lib/revenue-types";

export function RevenueReport() {
  return (
    <div
      id="revenue-report"
      className="
        rounded-xl border border-[rgb(var(--border))]
        bg-[rgb(var(--card))]
        p-6
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Revenue</h3>
          <p className="mt-1 text-sm text-[rgb(var(--muted))]">
            Revenue overview for the selected period.
          </p>
        </div>

        {/* Export actions */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={() => exportRevenueCSV(REVENUE)}
            className="rounded-lg border border-[rgb(var(--border))] px-3 py-1.5 text-sm hover:bg-[rgb(var(--border))]/40 transition"
          >
            Export CSV
          </button>

          <button
            onClick={() => exportRevenuePDF(REVENUE)}
            className="rounded-lg bg-[rgb(var(--primary))] px-3 py-1.5 text-sm font-medium text-black hover:opacity-90 transition"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-[rgb(var(--border))] p-4">
          <p className="text-sm text-[rgb(var(--muted))]">Total Revenue</p>
          <p className="mt-1 text-xl font-semibold">
            {REVENUE.currency} {REVENUE.totalRevenue.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg border border-[rgb(var(--border))] p-4">
          <p className="text-sm text-[rgb(var(--muted))]">Monthly Growth</p>
          <p
            className={`mt-1 text-xl font-semibold ${
              REVENUE.growthRate < 0 ? "text-red-400" : "text-green-400"
            }`}
          >
            {REVENUE.growthRate}%
          </p>
        </div>

        <div className="rounded-lg border border-[rgb(var(--border))] p-4">
          <p className="text-sm text-[rgb(var(--muted))]">Failed Payments</p>
          <p className="mt-1 text-xl font-semibold">{REVENUE.failedPayments}</p>
        </div>
      </div>
    </div>
  );
}
