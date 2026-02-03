interface Transaction {
  id: string;
  user: string;
  email: string;
  amount: number;
  currency: "USD" | "EUR" | "CHF";
  status: "success" | "pending" | "failed";
  date: string;
}

const TRANSACTIONS: Transaction[] = [
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

export function TransactionsReport() {
  return (
    <div
      className="
        rounded-xl border border-[rgb(var(--border))]
        bg-[rgb(var(--card))]
        p-6
      "
    >
      <div className="mb-4">
        <h3 className="font-semibold">Transactions</h3>
        <p className="text-sm text-[rgb(var(--muted))]">
          Complete transaction history.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgb(var(--border))] text-left">
              <th className="pb-2 font-medium">User</th>
              <th className="pb-2 font-medium">Amount</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Date</th>
            </tr>
          </thead>

          <tbody>
            {TRANSACTIONS.map((tx) => (
              <tr
                key={tx.id}
                className="border-b border-[rgb(var(--border))]/50 last:border-0"
              >
                <td className="py-3">
                  <div className="font-medium">{tx.user}</div>
                  <div className="text-xs text-[rgb(var(--muted))]">
                    {tx.email}
                  </div>
                </td>

                <td className="py-3">
                  {tx.currency} {tx.amount}
                </td>

                <td className="py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium
                      ${
                        tx.status === "success"
                          ? "bg-[rgb(var(--success))]/10 text-[rgb(var(--success))]"
                          : tx.status === "pending"
                            ? "bg-yellow-400/10 text-yellow-400"
                            : "bg-red-500/10 text-red-500"
                      }`}
                  >
                    {tx.status}
                  </span>
                </td>

                <td className="py-3 text-[rgb(var(--muted))]">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
