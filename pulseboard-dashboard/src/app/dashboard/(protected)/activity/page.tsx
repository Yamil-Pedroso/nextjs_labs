"use client";

import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { useActivityInsights } from "@/hooks/insights/useActivityInsights";
import type { Insight } from "@/lib/insight-types";

const ICON_MAP: Record<
  Insight["type"],
  {
    icon: React.ElementType;
    className: string;
  }
> = {
  success: {
    icon: CheckCircleIcon,
    className: "text-emerald-500 bg-emerald-500/10",
  },
  info: {
    icon: InformationCircleIcon,
    className: "text-blue-500 bg-blue-500/10",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    className: "text-amber-500 bg-amber-500/10",
  },
};

export default function ActivityPage() {
  const { data: insights, isLoading, isError } = useActivityInsights();

  return (
    <section className="p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Activity</h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          AI-generated insights based on recent product activity.
        </p>
      </div>

      {/* States */}
      {isLoading && (
        <p className="text-sm text-[rgb(var(--muted))]">
          Loading activity insights…
        </p>
      )}

      {isError && (
        <p className="text-sm text-red-500">
          Failed to load activity insights.
        </p>
      )}

      {/* Insights list */}
      <div className="space-y-4">
        {insights?.map((insight) => {
          const { icon: Icon, className } = ICON_MAP[insight.type];

          return (
            <div
              key={insight.id}
              className="
                flex items-start gap-4
                rounded-xl border border-[rgb(var(--border))]
                bg-[rgb(var(--card))]
                p-4
              "
            >
              <div
                className={`
                  flex h-10 w-10 items-center justify-center
                  rounded-lg
                  ${className}
                `}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1 space-y-1">
                <h3 className="font-medium">{insight.title}</h3>
                <p className="text-sm text-[rgb(var(--muted))]">
                  {insight.description}
                </p>
              </div>
            </div>
          );
        })}

        {!isLoading && insights?.length === 0 && (
          <p className="text-sm text-[rgb(var(--muted))]">
            No activity insights available.
          </p>
        )}
      </div>
    </section>
  );
}
