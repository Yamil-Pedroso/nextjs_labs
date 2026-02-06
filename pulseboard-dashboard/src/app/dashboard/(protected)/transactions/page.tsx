"use client";

import { useTransactionsInsights } from "@/hooks/insights/useTransactionsInsights";
import type { Insight } from "@/lib/insight-types";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
  CreditCardIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

const INSIGHT_UI: Record<
  Insight["type"],
  {
    icon: React.ElementType;
    color: string;
    bg: string;
    border: string;
  }
> = {
  success: {
    icon: CheckCircleIcon,
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  info: {
    icon: ArrowPathIcon,
    color: "text-blue-600",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    color: "text-amber-600",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
};

export default function TransactionsPage() {
  const { data: insights, isLoading, isError } = useTransactionsInsights();

  const hasWarning = insights?.some((i) => i.type === "warning");

  return (
    <section className="px-6 py-6 lg:px-10 lg:py-8 space-y-12">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
        <p className="text-sm text-[rgb(var(--muted))] max-w-xl">
          Operational health and reliability of payment transactions.
        </p>
      </div>

      {/* System Status */}
      <div
        className={`
          flex items-center gap-4
          rounded-2xl border
          p-5
          ${
            hasWarning
              ? "border-amber-500/40 bg-amber-500/5"
              : "border-emerald-500/40 bg-emerald-500/5"
          }
        `}
      >
        {hasWarning ? (
          <ExclamationTriangleIcon className="h-7 w-7 text-amber-600" />
        ) : (
          <CheckCircleIcon className="h-7 w-7 text-emerald-600" />
        )}

        <div>
          <h2 className="font-medium">
            {hasWarning
              ? "Transaction Issues Detected"
              : "Payment System Healthy"}
          </h2>
          <p className="text-sm text-[rgb(var(--muted))]">
            {hasWarning
              ? "Some transaction anomalies require attention."
              : "All transaction systems are operating normally."}
          </p>
        </div>
      </div>

      {/* Technical KPIs (placeholder for now) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <TechStat title="Total Transactions" value="98" icon={CreditCardIcon} />
        <TechStat title="Success Rate" value="100%" icon={CheckCircleIcon} />
        <TechStat title="Failed Payments" value="0" icon={XCircleIcon} />
        <TechStat title="Retries" value="—" icon={ArrowPathIcon} />
      </div>

      {/* Transaction Alerts (AI) */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Transaction Alerts</h3>
          <p className="text-sm text-[rgb(var(--muted))]">
            AI-detected issues, risks, and operational signals.
          </p>
        </div>

        {isLoading && (
          <p className="text-sm text-[rgb(var(--muted))]">
            Analyzing transaction data…
          </p>
        )}

        {isError && (
          <p className="text-sm text-red-500">
            Failed to load transaction insights.
          </p>
        )}

        <div className="space-y-3">
          {insights?.map((insight) => {
            const UI = INSIGHT_UI[insight.type];
            const Icon = UI.icon;

            return (
              <div
                key={insight.id}
                className={`
                  flex items-start gap-4
                  rounded-xl border
                  ${UI.border}
                  bg-[rgb(var(--card))]
                  p-4
                `}
              >
                <div
                  className={`
                    flex h-9 w-9 items-center justify-center
                    rounded-lg
                    ${UI.bg} ${UI.color}
                  `}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-medium leading-tight">{insight.title}</h4>
                  <p className="text-sm text-[rgb(var(--muted))]">
                    {insight.description}
                  </p>
                </div>
              </div>
            );
          })}

          {!isLoading && insights?.length === 0 && (
            <p className="text-sm text-[rgb(var(--muted))]">
              No transaction alerts detected.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function TechStat({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[rgb(var(--muted))]">{title}</span>
        <Icon className="h-4 w-4 text-[rgb(var(--muted))]" />
      </div>
      <div className="text-xl font-semibold">{value}</div>
    </div>
  );
}
