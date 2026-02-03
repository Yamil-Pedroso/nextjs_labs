import {
  DocumentArrowDownIcon,
  DocumentChartBarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { TransactionsReport } from "@/components/reports/transactions-report";
import { InsightsPanel } from "@/components/reports/insights-panel";

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
    id: "sessions",
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

export default function ReportsPage() {
  return (
    <section className="p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="mt-1 text-sm text-[rgb(var(--muted))]">
          Generate and export detailed reports.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {REPORTS.map((report) => {
          const Icon = report.icon;

          return (
            <div
              key={report.id}
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
                {report.id === "transactions" ? (
                  <a
                    href="#transactions-report"
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
                ) : (
                  <>
                    <button
                      className="
                        flex-1 inline-flex items-center justify-center gap-2
                        rounded-lg border border-[rgb(var(--border))]
                        px-4 py-2 text-sm
                        hover:bg-[rgb(var(--border))]/40
                        transition
                      "
                    >
                      <DocumentArrowDownIcon className="h-4 w-4" />
                      CSV
                    </button>

                    <button
                      className="
                        flex-1 inline-flex items-center justify-center gap-2
                        rounded-lg bg-[rgb(var(--primary))]
                        px-4 py-2 text-sm font-medium text-black
                        hover:opacity-90
                        transition
                      "
                    >
                      <DocumentArrowDownIcon className="h-4 w-4" />
                      PDF
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div
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
      </div>
      <InsightsPanel />
      <TransactionsReport />
    </section>
  );
}
