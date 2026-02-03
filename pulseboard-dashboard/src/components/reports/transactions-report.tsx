"use client";

import { exportTransactionsCSV, exportTransactionsPDF } from "@/lib/export";
import { TRANSACTIONS } from "@/lib/transaction-types";

export function TransactionsReport() {
  return (
    <div
      id="transactions-report"
      className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Transactions</h3>
          <p className="text-sm text-[rgb(var(--muted))]">
            Complete transaction history.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => exportTransactionsCSV(TRANSACTIONS)}
            className="rounded-lg border border-[rgb(var(--border))] px-3 py-1.5 text-sm hover:bg-[rgb(var(--border))]/40 transition"
          >
            Export CSV
          </button>

          <button
            onClick={() => exportTransactionsPDF(TRANSACTIONS)}
            className="rounded-lg bg-[rgb(var(--primary))] px-3 py-1.5 text-sm font-medium text-black hover:opacity-90 transition"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgb(var(--border))] text-left">
              <th className="pb-2 font-medium">User</th>
              <th className="pb-2 font-medium">Amount</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Date</th>
            </tr>
          </thead>

          <tbody>
            {TRANSACTIONS.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-[rgb(var(--border))]/50 last:border-0"
              >
                <td className="py-3">
                  <div className="font-medium">{tx.user}</div>
                  <div className="text-xs text-[rgb(var(--muted))]">
                    {tx.email}
                  </div>
                </td>

                <td className="py-3">
                  {tx.currency} {tx.amount}
                </td>

                <td className="py-3">
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
                </td>

                <td className="py-3 text-[rgb(var(--muted))]">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
