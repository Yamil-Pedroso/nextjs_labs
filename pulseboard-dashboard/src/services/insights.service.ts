import { apiClient } from "@/api/client";
import type { Insight } from "@/lib/insight-types";

interface InsightsResponse {
  insights: Insight[];
}

export async function fetchInsights(): Promise<Insight[]> {
  const { data } = await apiClient.get<InsightsResponse>("/insights");
  return data.insights;
}
