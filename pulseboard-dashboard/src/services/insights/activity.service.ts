import { apiClient } from "@/api/client";
import type { Insight } from "@/lib/insight-types";

interface ActivityInsightsResponse {
  snapshot: unknown; // luego lo tipamos si quieres
  insights: Insight[];
}

export async function fetchActivityInsights(): Promise<Insight[]> {
  const { data } =
    await apiClient.get<ActivityInsightsResponse>("/insights/activity");
  return data.insights;
}
