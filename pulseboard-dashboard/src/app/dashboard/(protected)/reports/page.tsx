"use client";

import {
  DocumentChartBarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { RevenueReport } from "@/components/reports/revenue-report";
import { UsersReport } from "@/components/reports/users-report";
import { ActivityReport } from "@/components/reports/activity-report";
import { TransactionsReport } from "@/components/reports/transactions-report";
import { InsightsPanel } from "@/components/reports/insights-panel";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/use-products";

interface Report {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const REPORTS: Report[] = [
  {
    id: "revenue",
    title: "Revenue Report",
    description: "Monthly and yearly revenue breakdown.",
    icon: CurrencyDollarIcon,
  },
  {
    id: "users",
    title: "Users Report",
    description: "User growth, registrations and churn.",
    icon: UsersIcon,
  },
  {
    id: "activity",
    title: "Activity Report",
    description: "Sessions, activity and engagement.",
    icon: ArrowPathIcon,
  },
  {
    id: "transactions",
    title: "Transactions Report",
    description: "Full transaction history and payments.",
    icon: DocumentChartBarIcon,
  },
];

const reportLinks: Record<string, string> = {
  revenue: "#revenue-report",
  users: "#users-report",
  activity: "#activity-report",
  transactions: "#transactions-report",
};

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

export default function ReportsPage() {
  const { data: products, isLoading, error } = useProducts();

  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="p-6 lg:p-8 space-y-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Generate and export detailed reports.
        </p>

        {isLoading && <p>Loading products...</p>}
        {error && <p className="text-red-500">Error loading products</p>}
        {products && (
          <div className="mt-4">
            <h2 className="text-lg font-medium">Products:</h2>
            <ul className="list-disc list-inside">
              {products.map((product) => (
                <li key={product.id}>{product.name}</li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        {REPORTS.map((report) => {
          const Icon = report.icon;

          return (
            <motion.div
              key={report.id}
              variants={itemVariants}
              className="
                rounded-xl border border-[rgb(var(--border))]
                bg-[rgb(var(--card))]
                p-6 flex flex-col
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-lg bg-[rgb(var(--primary))]/10
                    text-[rgb(var(--primary))]
                  "
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-medium">{report.title}</h3>
                  <p className="text-sm text-[rgb(var(--muted))]">
                    {report.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                {reportLinks[report.id] && (
                  <a
                    href={reportLinks[report.id]}
                    className="
                      flex-1 inline-flex items-center justify-center gap-2
                      rounded-lg bg-[rgb(var(--primary))]
                      px-4 py-2 text-sm font-medium text-black
                      hover:opacity-90
                      transition
                    "
                  >
                    <DocumentChartBarIcon className="h-4 w-4" />
                    View report
                  </a>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="
          rounded-xl border border-dashed border-[rgb(var(--border))]
          bg-[rgb(var(--card))]
          p-6
        "
      >
        <h3 className="font-medium">Insights (Coming Soon)</h3>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          AI-powered insights and smart alerts will appear here once enabled.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <InsightsPanel />
      </motion.div>

      <motion.div variants={itemVariants}>
        <RevenueReport />
        <UsersReport />
        <ActivityReport />
        <TransactionsReport />
      </motion.div>
    </motion.section>
  );
}
