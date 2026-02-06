import { useQuery } from "@tanstack/react-query";
import { fetchRevenueInsights } from "@/services/insights/revenue.service";

export function useRevenueInsights() {
  return useQuery({
    queryKey: ["insights", "revenue"],
    queryFn: fetchRevenueInsights,
  });
}
