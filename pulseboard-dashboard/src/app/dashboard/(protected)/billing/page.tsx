/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PlanCard } from "@/components/plan-card";
import { PLANS } from "@/lib/plans";
import { usePlan } from "@/hooks/use-plan";
import type { Transaction } from "@/lib/transaction-types";
import { RecentTransactions } from "@/components/billing/recent-transactions";

const TRANSACTIONS: Transaction[] = [
  {
    id: "tx_001",
    user: "John Doe",
    email: "john@example.com",
    amount: 30,
    currency: "CHF",
    status: "success",
    date: "2026-02-01",
  },
  {
    id: "tx_002",
    user: "Anna Smith",
    email: "anna@example.com",
    amount: 99,
    currency: "CHF",
    status: "pending",
    date: "2026-01-30",
  },
  {
    id: "tx_003",
    user: "Carlos Vega",
    email: "carlos@example.com",
    amount: 29,
    currency: "EUR",
    status: "failed",
    date: "2026-01-28",
  },
];

export default function BillingPage() {
  const { plan, selectPlan } = usePlan();

  return (
    <section className="px-4 py-4 sm:p-6 space-y-6">
      <h2 className="text-lg sm:text-xl font-semibold">Billing & Plans</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {Object.entries(PLANS).map(([key, p]) => (
          <PlanCard
            key={key}
            name={p.name}
            price={p.price}
            description={p.description}
            features={p.features}
            selected={plan === key}
            highlighted={key === "pro"}
            onSelect={() => selectPlan(key as any)}
          />
        ))}
      </div>

      <RecentTransactions transactions={TRANSACTIONS} />
    </section>
  );
}
