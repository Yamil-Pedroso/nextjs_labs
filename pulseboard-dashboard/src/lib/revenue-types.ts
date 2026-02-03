export interface RevenueMetric {
  totalRevenue: number;
  growthRate: number;
  failedPayments: number;
  currency: string;
  period: string;
}

export const REVENUE: RevenueMetric = {
  totalRevenue: 12400,
  growthRate: -18.4,
  failedPayments: 12,
  currency: "CHF",
  period: "Last 30 days",
};
