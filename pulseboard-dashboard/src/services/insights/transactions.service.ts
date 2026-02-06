import { apiClient } from "@/api/client";
import type { Insight } from "@/lib/insight-types";

interface TransactionsInsightsResponse {
  insights: Insight[];
}

export async function fetchTransactionsInsights(): Promise<Insight[]> {
  const { data } = await apiClient.get<TransactionsInsightsResponse>(
    "/insights/transactions",
  );

  return data.insights;
}
