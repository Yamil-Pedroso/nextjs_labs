import { useQuery } from "@tanstack/react-query";
import { fetchUsersInsights } from "@/services/insights/users.service";

export function useUsersInsights() {
  return useQuery({
    queryKey: ["insights", "users"],
    queryFn: fetchUsersInsights,
  });
}
