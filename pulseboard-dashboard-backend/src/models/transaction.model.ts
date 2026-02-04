export type TransactionStatus = "success" | "pending" | "failed";

export interface Transaction {
  id: string;
  user: string;
  email: string;
  amount: number;
  currency: "USD" | "EUR" | "CHF";
  status: TransactionStatus;
  date: string;
}
