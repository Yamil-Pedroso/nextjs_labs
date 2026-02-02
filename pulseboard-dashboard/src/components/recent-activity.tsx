"use client";

import {
  UserPlusIcon,
  ArrowTrendingUpIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

const activities = [
  {
    id: 1,
    label: "New user registered",
    time: "2 min ago",
    icon: UserPlusIcon,
  },
  {
    id: 2,
    label: "Revenue increased",
    time: "10 min ago",
    icon: ArrowTrendingUpIcon,
  },
  {
    id: 3,
    label: "Payment received",
    time: "1 hour ago",
    icon: CurrencyDollarIcon,
  },
  {
    id: 4,
    label: "New user registered",
    time: "3 hours ago",
    icon: UserPlusIcon,
  },
];

export function RecentActivity() {
  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 sm:p-6">
      <h3 className="mb-4 text-sm font-semibold text-[rgb(var(--text))]">
        Recent Activity
      </h3>

      <ul className="space-y-4">
        {activities.map((activity) => (
          <li key={activity.id} className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[rgb(var(--primary))]/20">
              <activity.icon className={`h-5 w-5 text-[rgb(var(--text))]`} />
            </div>

            <div className="flex-1">
              <p className="text-sm text-[rgb(var(--text))]">
                {activity.label}
              </p>
              <p className="text-xs text-[rgb(var(--muted))]">
                {activity.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
