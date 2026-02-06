import { Request, Response } from "express";
import { pool } from "../../config/db";
import { generateInsightsWithCache } from "../../services/generateInsightsWithCache";
import type { TransactionsSnapshot } from "../../types/transactions";

export async function getTransactionsInsights(_req: Request, res: Response) {
  try {
    // 🔹 CURRENT PERIOD (last 30 days)

    const current = await pool.query(`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE status = 'success') AS success,
        COUNT(*) FILTER (WHERE status = 'failed') AS failed
      FROM public.transactions
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `);

    const currentTotal = Number(current.rows[0].total);
    const currentSuccess = Number(current.rows[0].success);
    const currentFailed = Number(current.rows[0].failed);
    const currentSuccessRate =
      currentTotal > 0 ? Number((currentSuccess / currentTotal).toFixed(2)) : 0;

    // 🔹 PREVIOUS PERIOD (30–60 days ago)

    const previous = await pool.query(`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE status = 'success') AS success,
        COUNT(*) FILTER (WHERE status = 'failed') AS failed
      FROM public.transactions
      WHERE created_at BETWEEN
        NOW() - INTERVAL '60 days'
        AND NOW() - INTERVAL '30 days'
    `);

    const previousTotal = Number(previous.rows[0].total);
    const previousSuccess = Number(previous.rows[0].success);
    const previousFailed = Number(previous.rows[0].failed);
    const previousSuccessRate =
      previousTotal > 0
        ? Number((previousSuccess / previousTotal).toFixed(2))
        : 0;

    const snapshot: TransactionsSnapshot = {
      type: "transactions",
      period: "last_30_days",
      current_period: {
        total_transactions: currentTotal,
        successful_transactions: currentSuccess,
        failed_transactions: currentFailed,
        success_rate: currentSuccessRate,
      },
      previous_period: {
        total_transactions: previousTotal,
        successful_transactions: previousSuccess,
        failed_transactions: previousFailed,
        success_rate: previousSuccessRate,
      },
    };

    const insights = await generateInsightsWithCache(snapshot);

    res.json({
      snapshot,
      insights,
    });
  } catch (error) {
    console.error("Transactions insights error:", error);
    res.status(500).json({
      error: "Failed to generate transactions insights",
    });
  }
}
