import { useQuery } from "@tanstack/react-query";
import { fetchTransactionsInsights } from "@/services/insights/transactions.service";

export function useTransactionsInsights() {
  return useQuery({
    queryKey: ["insights", "transactions"],
    queryFn: fetchTransactionsInsights,
  });
}
