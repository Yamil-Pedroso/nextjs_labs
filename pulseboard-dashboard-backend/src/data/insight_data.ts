import { Insight } from "../types/insight";

export const MOCK_INSIGHTS: Insight[] = [
  {
    id: "revenue-drop",
    title: "Revenue decrease detected",
    description:
      "Revenue dropped by 18% compared to the previous period. The decrease correlates with lower transaction volume.",
    type: "warning",
  },
  {
    id: "failed-payments",
    title: "Increase in failed payments",
    description:
      "Failed transactions increased by 12% this week. Consider reviewing payment methods.",
    type: "info",
  },
  {
    id: "stable-growth",
    title: "Billing performance is stable",
    description:
      "Successful payments remained stable over the last 14 days, indicating healthy billing activity.",
    type: "success",
  },
];
