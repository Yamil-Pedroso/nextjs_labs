import { apiClient } from "@/api/client";
import { Insight } from "@/lib/insight-types";

export async function fetchUsersInsights(): Promise<Insight[]> {
  const { data } = await apiClient.get("/insights/users");
  return data.insights;
}
