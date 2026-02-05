/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PlanCard } from "@/components/plan-card";
import { PlansTestCard } from "@/components/plant-test-card";
import { PLANS } from "@/lib/plans";
import { usePlan, usePlans } from "@/hooks/use-plan";
import { useCheckout } from "@/hooks/use-checkout";
import type { Plan } from "@/lib/plans";
import type { Transaction } from "@/lib/transaction-types";
import { RecentTransactions } from "@/components/billing/recent-transactions";
import { motion } from "framer-motion";

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
  const { plans, loading: plansLoading, error } = usePlans();

  // 🔴 temporal hasta que tengas auth real
  const userId = "567b5a1c-5e91-4cd3-92c6-66bbedf93f94";
  const { checkout, loading } = useCheckout(userId);

  function handleSelectPlan(planId: Plan) {
    selectPlan(planId);

    // 🔥 SOLO planes pagos
    if (planId === "pro" || planId === "enterprise") {
      checkout(planId);
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="px-4 py-4 sm:p-6 space-y-6"
    >
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
            loading={loading && (key === "pro" || key === "enterprise")}
            onSelect={() => handleSelectPlan(key as Plan)}
          />
        ))}
      </div>

      <div>
        <h3 className="text-md sm:text-lg font-semibold mb-4">
          Fetched Plans from Backend
        </h3>
        {plansLoading && <p>Loading plans...</p>}
        {error && <p className="text-red-500">Error loading plans: {error}</p>}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((plan: any) => (
            <PlansTestCard key={plan.id} plan={plan} />
          ))}
        </div>
      </div>

      {/* ⛔️ se queda hardcode por ahora */}
      <RecentTransactions transactions={TRANSACTIONS} />
    </motion.section>
  );
}
