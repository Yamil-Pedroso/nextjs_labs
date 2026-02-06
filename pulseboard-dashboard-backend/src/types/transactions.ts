export interface TransactionsSnapshot {
  type: "transactions";
  period: string;
  current_period: {
    total_transactions: number;
    successful_transactions: number;
    failed_transactions: number;
    success_rate: number;
  };
  previous_period: {
    total_transactions: number;
    successful_transactions: number;
    failed_transactions: number;
    success_rate: number;
  };
}
