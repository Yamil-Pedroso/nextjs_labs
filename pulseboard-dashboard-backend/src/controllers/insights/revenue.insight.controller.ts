import { Request, Response } from "express";
import { pool } from "../../config/db";
import { generateInsightsWithCache } from "../../services/generateInsightsWithCache";

export async function getRevenueInsights(_req: Request, res: Response) {
  try {
    // 🔹 Periodo actual (últimos 30 días)
    const current = await pool.query(`
      SELECT
        COALESCE(SUM(amount), 0) AS revenue,
        COUNT(*)::int AS transactions,
        COUNT(*) FILTER (WHERE status = 'failed')::int AS failed
      FROM transactions
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `);

    // 🔹 Periodo anterior (30–60 días)
    const previous = await pool.query(`
      SELECT
        COALESCE(SUM(amount), 0) AS revenue,
        COUNT(*)::int AS transactions,
        COUNT(*) FILTER (WHERE status = 'failed')::int AS failed
      FROM transactions
      WHERE created_at BETWEEN
        NOW() - INTERVAL '60 days'
        AND NOW() - INTERVAL '30 days'
    `);

    const snapshot = {
      type: "revenue",
      period: "last_30_days",
      current_period: {
        revenue: Number(current.rows[0].revenue),
        transactions: current.rows[0].transactions,
        failed_payments: current.rows[0].failed,
      },
      previous_period: {
        revenue: Number(previous.rows[0].revenue),
        transactions: previous.rows[0].transactions,
        failed_payments: previous.rows[0].failed,
      },
    };

    const insights = await generateInsightsWithCache(snapshot);

    res.json({
      snapshot,
      insights,
    });
  } catch (error) {
    console.error("Revenue insights error:", error);
    res.status(500).json({ error: "Failed to generate revenue insights" });
  }
}
