"use client";
import { exportActivityCSV, exportActivityPDF } from "@/lib/export";
import { ACTIVITY } from "@/lib/activity-types";

export function ActivityReport() {
  return (
    <div
      id="activity-report"
      className="
        rounded-xl border border-[rgb(var(--border))]
        bg-[rgb(var(--card))]
        p-6
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Activity</h3>
          <p className="mt-1 text-sm text-[rgb(var(--muted))]">
            User engagement and activity metrics.
          </p>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => exportActivityCSV(ACTIVITY)}
            className="rounded-lg border border-[rgb(var(--border))] px-3 py-1.5 text-sm hover:bg-[rgb(var(--border))]/40 transition"
          >
            Export CSV
          </button>

          <button
            onClick={() => exportActivityPDF(ACTIVITY)}
            className="rounded-lg bg-[rgb(var(--primary))] px-3 py-1.5 text-sm font-medium text-black hover:opacity-90 transition"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Metrics */}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-[rgb(var(--border))] p-4">
          <p className="text-sm text-[rgb(var(--muted))]">Sessions (30d)</p>
          <p className="mt-1 text-xl font-semibold">
            {ACTIVITY.sessions.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg border border-[rgb(var(--border))] p-4">
          <p className="text-sm text-[rgb(var(--muted))]">
            Avg. Sessions / User
          </p>
          <p className="mt-1 text-xl font-semibold">
            {ACTIVITY.avgSessionsPerUser}
          </p>
        </div>

        <div className="rounded-lg border border-[rgb(var(--border))] p-4">
          <p className="text-sm text-[rgb(var(--muted))]">Active Rate</p>
          <p className="mt-1 text-xl font-semibold">{ACTIVITY.activeRate}%</p>
        </div>
      </div>
    </div>
  );
}
