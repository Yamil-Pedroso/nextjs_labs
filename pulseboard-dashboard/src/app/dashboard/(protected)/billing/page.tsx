/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { PlanCard } from "@/components/plan-card";
import { PLANS } from "@/lib/plans";
import { usePlan } from "@/hooks/use-plan";
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

const pageVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
} as const;

export default function BillingPage() {
  const { plan, selectPlan } = usePlan();

  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="px-4 py-4 sm:p-6 space-y-6"
    >
      <motion.h2
        variants={itemVariants}
        className="text-lg sm:text-xl font-semibold"
      >
        Billing & Plans
      </motion.h2>

      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 gap-6 md:grid-cols-3"
      >
        {Object.entries(PLANS).map(([key, p]) => (
          <motion.div key={key} variants={itemVariants}>
            <PlanCard
              name={p.name}
              price={p.price}
              description={p.description}
              features={p.features}
              selected={plan === key}
              highlighted={key === "pro"}
              onSelect={() => selectPlan(key as any)}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <RecentTransactions transactions={TRANSACTIONS} />
      </motion.div>
    </motion.section>
  );
}
