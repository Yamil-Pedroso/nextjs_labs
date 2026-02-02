import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/lib/mock-data";

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
  });
}
