"use client";

import { useRouter } from "next/navigation";

export function AccountSummary() {
  const router = useRouter();

  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
      <h3 className="mb-3 text-sm font-semibold text-[rgb(var(--text))]">
        Account
      </h3>

      <div className="space-y-1 text-sm text-[rgb(var(--muted))]">
        <p>
          Plan: <span className="text-[rgb(var(--text))]">Pro</span>
        </p>
        <p>
          Users: <span className="text-[rgb(var(--text))]">8 / 10</span>
        </p>
        <p>
          Billing: <span className="text-[rgb(var(--text))]">Feb 14</span>
        </p>
      </div>

      <button
        onClick={() => router.push("/dashboard/billing")}
        className="mt-3 w-full rounded-lg bg-[rgb(var(--primary))] px-3 py-2 text-sm font-medium text-black transition hover:opacity-90"
      >
        Manage Plan
      </button>
    </div>
  );
}
