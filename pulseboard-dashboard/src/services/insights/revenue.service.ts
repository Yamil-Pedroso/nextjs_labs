import { apiClient } from "@/api/client";
import type { Insight } from "@/lib/insight-types";

interface RevenueInsightsResponse {
  insights: Insight[];
}

export async function fetchRevenueInsights(): Promise<Insight[]> {
  const { data } =
    await apiClient.get<RevenueInsightsResponse>("/insights/revenue");

  return data.insights;
}
