import { useQuery } from "@tanstack/react-query";
import { fetchActivityInsights } from "@/services/insights/activity.service";

export function useActivityInsights() {
  return useQuery({
    queryKey: ["insights", "activity"],
    queryFn: fetchActivityInsights,
  });
}
