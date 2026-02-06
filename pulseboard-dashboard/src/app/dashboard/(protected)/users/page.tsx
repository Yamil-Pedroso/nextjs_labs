"use client";

import { useEffect, useState } from "react";
import { UsersTable } from "@/components/users-table";
import { getUsers } from "@/lib/users-data";
import type { User } from "@/lib/users-data";
import { useUsersInsights } from "@/hooks/insights/useUsersInsights";
import type { Insight } from "@/lib/insight-types";

import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const INSIGHT_UI: Record<
  Insight["type"],
  {
    icon: React.ElementType;
    bg: string;
    text: string;
    accent: string;
  }
> = {
  success: {
    icon: ArrowTrendingUpIcon,
    bg: "bg-emerald-500/10",
    text: "text-emerald-600",
    accent: "border-emerald-500/30",
  },
  info: {
    icon: UsersIcon,
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    accent: "border-blue-500/30",
  },
  warning: {
    icon: ExclamationTriangleIcon,
    bg: "bg-amber-500/10",
    text: "text-amber-600",
    accent: "border-amber-500/30",
  },
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    data: insights,
    isLoading: insightsLoading,
    isError,
  } = useUsersInsights();

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="px-4 py-4 sm:p-6 space-y-6">
        <h2 className="text-lg sm:text-xl font-semibold">Users</h2>
        <div className="h-64 rounded-xl bg-[rgb(var(--border))]/60 animate-pulse" />
      </section>
    );
  }

  return (
    <section className="px-4 py-4 sm:p-6 space-y-12">
      {/* Users table */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-semibold">Users</h2>
        <UsersTable users={users} />
      </div>

      {/* Users Insights */}
      <div className="space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold">
            User Growth & Engagement
          </h3>
          <p className="text-sm text-[rgb(var(--muted))]">
            High-level insights about user acquisition and activity.
          </p>
        </div>

        {insightsLoading && (
          <p className="text-sm text-[rgb(var(--muted))]">
            Analyzing user data…
          </p>
        )}

        {isError && (
          <p className="text-sm text-red-500">Failed to load user insights.</p>
        )}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {insights?.map((insight) => {
            const UI = INSIGHT_UI[insight.type];
            const Icon = UI.icon;

            return (
              <div
                key={insight.id}
                className={`
                  rounded-2xl border
                  ${UI.accent}
                  bg-[rgb(var(--card))]
                  p-5 space-y-4
                `}
              >
                <div
                  className={`
                    inline-flex items-center justify-center
                    h-10 w-10 rounded-xl
                    ${UI.bg} ${UI.text}
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

          {!insightsLoading && insights?.length === 0 && (
            <p className="text-sm text-[rgb(var(--muted))]">
              No user insights available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
