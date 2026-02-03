"use client";

import type { Transaction } from "@/lib/transaction-types";
import Link from "next/link";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <div
      className="
        rounded-xl border border-[rgb(var(--border))]
        bg-[rgb(var(--card))]
        p-6
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Recent Transactions</h3>
          <p className="text-sm text-[rgb(var(--muted))]">
            Latest billing activity.
          </p>
        </div>

        <Link
          href="/dashboard/reports#transactions-report"
          className="text-sm font-medium text-[rgb(var(--primary))] hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="space-y-3">
        {transactions.slice(0, 5).map((tx) => (
          <div
            key={tx.id}
            className="
              flex items-center justify-between
              rounded-lg border border-[rgb(var(--border))]/50
              px-4 py-3
            "
          >
            <div>
              <div className="font-medium">{tx.user}</div>
              <div className="text-xs text-[rgb(var(--muted))]">{tx.date}</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm">
                {tx.currency} {tx.amount}
              </div>

              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium
                  ${
                    tx.status === "success"
                      ? "bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]"
                      : tx.status === "pending"
                        ? "bg-yellow-400/10 text-yellow-400"
                        : "bg-red-500/10 text-red-500"
                  }`}
              >
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
