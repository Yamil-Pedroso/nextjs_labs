import { Request, Response } from "express";
import { pool } from "../../config/db";
import { Transaction, TransactionStatus } from "../../models/transaction.model";

// Interfaz para el resultado de la query
interface TransactionRow {
  id: string;
  email: string;
  amount: number;
  currency: string;
  status: TransactionStatus;
  created_at: Date;
}

export async function getTransactionsReport(_req: Request, res: Response) {
  try {
    const result = await pool.query<TransactionRow>(`
      SELECT
        t.id,
        u.email,
        t.amount,
        t.currency,
        t.status,
        t.created_at
      FROM transactions t
      JOIN users u ON u.id = t.user_id
      ORDER BY t.created_at DESC
      LIMIT 20
    `);

    const transactions: Transaction[] = result.rows.map((row) => {
      const name = row.email.split("@")[0];

      return {
        id: row.id,
        user: name
          .split(".")
          .map((p: string) => p.charAt(0).toUpperCase() + p.slice(1))
          .join(" "),
        email: row.email,
        amount: row.amount,
        currency: row.currency as "USD" | "EUR" | "CHF",
        status: row.status,
        date: row.created_at.toISOString().split("T")[0],
      };
    });

    res.json({
      status: "success",
      data: transactions,
    });
  } catch (error) {
    console.error("Transactions controller error:", error);
    res.status(500).json({ error: "Failed to load transactions report" });
  }
}
