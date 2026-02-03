import {
  ExclamationTriangleIcon,
  ArrowTrendingDownIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface Insight {
  id: string;
  title: string;
  description: string;
  type: "info" | "warning" | "success";
}

const INSIGHTS: Insight[] = [
  {
    id: "revenue-drop",
    title: "Revenue decrease detected",
    description:
      "Revenue dropped by 18% compared to the previous period. The decrease correlates with a lower transaction volume.",
    type: "warning",
  },
  {
    id: "failed-payments",
    title: "Increase in failed payments",
    description:
      "Failed transactions increased by 12% this week. Consider reviewing payment methods or retry logic.",
    type: "info",
  },
  {
    id: "stable-growth",
    title: "User payments remain stable",
    description:
      "Successful payments remained stable over the last 14 days, indicating healthy billing performance.",
    type: "success",
  },
];

function getInsightStyles(type: Insight["type"]) {
  switch (type) {
    case "warning":
      return {
        icon: ArrowTrendingDownIcon,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
      };
    case "success":
      return {
        icon: CheckCircleIcon,
        color: "text-[rgb(var(--success))]",
        bg: "bg-[rgb(var(--success))]/10",
      };
    default:
      return {
        icon: ExclamationTriangleIcon,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
      };
  }
}

export function InsightsPanel() {
  return (
    <div
      className="
        rounded-xl border border-[rgb(var(--border))]
        bg-[rgb(var(--card))]
        p-6 space-y-4
      "
    >
      <div>
        <h3 className="font-semibold">Insights</h3>
        <p className="text-sm text-[rgb(var(--muted))]">
          Automated analysis based on recent activity.
        </p>
      </div>

      <div className="space-y-3">
        {INSIGHTS.map((insight) => {
          const styles = getInsightStyles(insight.type);
          const Icon = styles.icon;

          return (
            <div
              key={insight.id}
              className={`
                flex gap-4 rounded-lg border border-[rgb(var(--border))]/50
                p-4 ${styles.bg}
              `}
            >
              <Icon className={`h-5 w-5 mt-0.5 ${styles.color}`} />

              <div>
                <div className="font-medium">{insight.title}</div>
                <p className="text-sm text-[rgb(var(--muted))]">
                  {insight.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
