"use client";

import { useRevenueInsights } from "@/hooks/insights/useRevenueInsights";
import type { Insight } from "@/lib/insight-types";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  ExclamationCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const INSIGHT_STYLE: Record<
  Insight["type"],
  {
    icon: React.ElementType;
    accent: string;
    bg: string;
  }
> = {
  success: {
    icon: ArrowTrendingUpIcon,
    accent: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  info: {
    icon: BanknotesIcon,
    accent: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  warning: {
    icon: ExclamationCircleIcon,
    accent: "text-amber-600",
    bg: "bg-amber-500/10",
  },
};

export default function RevenuePage() {
  const { data: insights, isLoading, isError } = useRevenueInsights();

  return (
    <section className="px-6 py-6 lg:px-10 lg:py-8 space-y-12">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Revenue</h1>
        <p className="text-sm text-[rgb(var(--muted))] max-w-xl">
          Financial performance insights based on transactions and subscription
          activity.
        </p>
      </div>

      {/* Top KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <RevenueStat
          title="Total Revenue"
          value="CHF 12,400"
          delta="+18.2%"
          positive
          icon={BanknotesIcon}
        />
        <RevenueStat
          title="Transactions"
          value="98"
          delta="+12"
          positive
          icon={ShieldCheckIcon}
        />
        <RevenueStat
          title="Failed Payments"
          value="12"
          delta="+6"
          positive={false}
          icon={ArrowTrendingDownIcon}
        />
        <RevenueStat
          title="Revenue Growth"
          value="+18%"
          delta="vs last period"
          positive
          icon={ArrowTrendingUpIcon}
        />
      </div>

      {/* AI Revenue Signals */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Revenue Signals</h2>
          <p className="text-sm text-[rgb(var(--muted))]">
            AI-detected trends, risks, and opportunities.
          </p>
        </div>

        {isLoading && (
          <p className="text-sm text-[rgb(var(--muted))]">
            Analyzing revenue data…
          </p>
        )}

        {isError && (
          <p className="text-sm text-red-500">
            Failed to load revenue insights.
          </p>
        )}

        <div className="grid gap-5 lg:grid-cols-2">
          {insights?.map((insight) => {
            const UI = INSIGHT_STYLE[insight.type];
            const Icon = UI.icon;

            return (
              <div
                key={insight.id}
                className="
                  relative overflow-hidden
                  rounded-2xl border border-[rgb(var(--border))]
                  bg-[rgb(var(--card))]
                  p-6
                "
              >
                <div
                  className={`
                    absolute right-4 top-4
                    h-10 w-10 rounded-xl
                    flex items-center justify-center
                    ${UI.bg} ${UI.accent}
                  `}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="space-y-2 pr-12">
                  <h3 className="font-medium leading-snug">{insight.title}</h3>
                  <p className="text-sm text-[rgb(var(--muted))]">
                    {insight.description}
                  </p>
                </div>
              </div>
            );
          })}

          {!isLoading && insights?.length === 0 && (
            <p className="text-sm text-[rgb(var(--muted))]">
              No revenue insights available.
            </p>
          )}
        </div>
      </div>

      {/* Financial Health */}
      <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <ShieldCheckIcon className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium">Financial Health</h3>
            <p className="text-sm text-[rgb(var(--muted))]">
              Revenue system is operating within healthy parameters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function RevenueStat({
  title,
  value,
  delta,
  positive,
  icon: Icon,
}: {
  title: string;
  value: string;
  delta: string;
  positive: boolean;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[rgb(var(--muted))]">{title}</span>
        <Icon className="h-5 w-5 text-[rgb(var(--muted))]" />
      </div>

      <div className="text-2xl font-semibold tracking-tight">{value}</div>

      <span
        className={`text-sm ${
          positive ? "text-emerald-600" : "text-amber-600"
        }`}
      >
        {delta}
      </span>
    </div>
  );
}
