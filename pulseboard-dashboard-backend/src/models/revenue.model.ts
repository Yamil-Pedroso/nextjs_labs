type Currencies = "CHF" | "EUR" | "USD";
export interface RevenueMetric {
  totalRevenue: number;
  growthRate: number;
  failedPayments: number;
  currency: Currencies;
  period: string;
}
