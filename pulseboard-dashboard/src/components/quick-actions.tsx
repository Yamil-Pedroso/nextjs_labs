import Link from "next/link";
import {
  PlusIcon,
  ChartBarIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export function QuickActions() {
  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
      <h3 className="mb-4 text-sm font-semibold text-[rgb(var(--text))]">
        Quick Actions
      </h3>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <Link
          href="/dashboard/users"
          className="flex items-center gap-2 rounded-lg
                     bg-[rgb(var(--primary))]/20 px-3 py-2 text-sm
                     hover:bg-[rgb(var(--primary))]/30 transition"
        >
          <PlusIcon className="h-4 w-4" />
          Add User
        </Link>

        <Link
          href="/dashboard/analytics"
          className="flex items-center gap-2 rounded-lg
                     bg-[rgb(var(--primary))]/20 px-3 py-2 text-sm
                     hover:bg-[rgb(var(--primary))]/30 transition"
        >
          <ChartBarIcon className="h-4 w-4" />
          View Analytics
        </Link>

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 rounded-lg
                     bg-[rgb(var(--primary))]/20 px-3 py-2 text-sm
                     hover:bg-[rgb(var(--primary))]/30 transition"
        >
          <Cog6ToothIcon className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </div>
  );
}
