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

export const TRANSACTIONS: Transaction[] = [
  {
    id: "tx_001",
    user: "John Doe",
    email: "john@example.com",
    amount: 29,
    currency: "CHF",
    status: "success",
    date: "2026-02-01",
  },
  {
    id: "tx_002",
    user: "Anna Smith",
    email: "anna@example.com",
    amount: 99,
    currency: "CHF",
    status: "pending",
    date: "2026-01-30",
  },
  {
    id: "tx_003",
    user: "Carlos Vega",
    email: "carlos@example.com",
    amount: 29,
    currency: "EUR",
    status: "failed",
    date: "2026-01-28",
  },
];
