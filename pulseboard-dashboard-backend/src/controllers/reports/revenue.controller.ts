import { Request, Response } from "express";
import { pool } from "../../config/db";
import { RevenueMetric } from "../../models/revenue.model";

export async function getRevenueReport(_req: Request, res: Response) {
  try {
    const revenueResult = await pool.query(`
      SELECT COALESCE(SUM(amount), 0) AS total
      FROM transactions
      WHERE status = 'success'
    `);

    const failedResult = await pool.query(`
      SELECT COUNT(*)::int AS failed
      FROM transactions
      WHERE status = 'failed'
    `);

    const response: RevenueMetric = {
      totalRevenue: Number(revenueResult.rows[0].total),
      failedPayments: failedResult.rows[0].failed,
      growthRate: -18.4, // placeholder (luego real)
      currency: "CHF",
      period: "Last 30 days",
    };

    res.json(response);
  } catch (error) {
    console.error("Revenue report error:", error);
    res.status(500).json({ error: "Failed to load revenue report" });
  }
}
