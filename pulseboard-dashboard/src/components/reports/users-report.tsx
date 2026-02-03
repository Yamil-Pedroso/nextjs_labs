"use client";
import { exportUsersCSV, exportUsersPDF } from "@/lib/export";
import { USERS } from "@/lib/users-types";

export function UsersReport() {
  return (
    <div
      id="users-report"
      className="
        rounded-xl border border-[rgb(var(--border))]
        bg-[rgb(var(--card))]
        p-6
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Users</h3>
          <p className="mt-1 text-sm text-[rgb(var(--muted))]">
            User growth and account statistics.
          </p>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => exportUsersCSV(USERS)}
            className="rounded-lg border border-[rgb(var(--border))] px-3 py-1.5 text-sm hover:bg-[rgb(var(--border))]/40 transition"
          >
            Export CSV
          </button>

          <button
            onClick={() => exportUsersPDF(USERS)}
            className="rounded-lg bg-[rgb(var(--primary))] px-3 py-1.5 text-sm font-medium text-black hover:opacity-90 transition"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-lg border border-[rgb(var(--border))] p-4">
          <p className="text-sm text-[rgb(var(--muted))]">Total Users</p>
          <p className="mt-1 text-xl font-semibold">
            {USERS.totalUsers.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg border border-[rgb(var(--border))] p-4">
          <p className="text-sm text-[rgb(var(--muted))]">New Users (30d)</p>
          <p className="mt-1 text-xl font-semibold">
            {USERS.newUsers.toLocaleString()}
          </p>
        </div>

        <div className="rounded-lg border border-[rgb(var(--border))] p-4">
          <p className="text-sm text-[rgb(var(--muted))]">Active Users</p>
          <p className="mt-1 text-xl font-semibold">
            {USERS.activeUsers.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
