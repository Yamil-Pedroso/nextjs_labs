"use client";

import { useInsights } from "@/hooks/use-insights";
import {
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const ICONS = {
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
  success: CheckCircleIcon,
};

const COLORS = {
  warning: "text-yellow-400 bg-yellow-400/10",
  info: "text-blue-400 bg-blue-400/10",
  success: "text-[rgb(var(--success))] bg-[rgb(var(--success))]/10",
};

export function InsightsPanel() {
  const { data, loading, error } = useInsights();

  if (loading) {
    return (
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
        <p className="text-sm text-[rgb(var(--muted))]">Analyzing data…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-6 text-sm text-red-400">
        {error}
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
        <p className="text-sm text-[rgb(var(--muted))]">
          No insights available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((insight) => {
        const Icon = ICONS[insight.type];

        return (
          <div
            key={insight.id}
            className="flex gap-4 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4"
          >
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${COLORS[insight.type]}`}
            >
              <Icon className="h-5 w-5" />
            </div>

            <div>
              <h4 className="text-sm font-medium">{insight.title}</h4>
              <p className="mt-1 text-sm text-[rgb(var(--muted))]">
                {insight.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
