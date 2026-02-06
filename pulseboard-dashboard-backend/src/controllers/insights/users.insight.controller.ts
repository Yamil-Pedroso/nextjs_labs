import { Request, Response } from "express";
import { pool } from "../../config/db";
import { generateInsights } from "../../services/generateInsights";
import type { UsersSnapshot } from "../../types/users";

export async function getUsersInsights(_req: Request, res: Response) {
  try {
    // 🔹 CURRENT PERIOD (last 30 days)

    const currentTotalUsers = await pool.query(`
      SELECT COUNT(*) AS count
      FROM public.users
      WHERE created_at <= NOW()
    `);

    const currentNewUsers = await pool.query(`
      SELECT COUNT(*) AS count
      FROM public.users
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `);

    const currentActiveUsers = await pool.query(`
      SELECT COUNT(DISTINCT user_id) AS count
      FROM (
        SELECT user_id FROM public.transactions
        WHERE created_at >= NOW() - INTERVAL '30 days'
        UNION
        SELECT user_id FROM public.subscriptions
        WHERE started_at >= NOW() - INTERVAL '30 days'
      ) AS active_users
    `);

    // 🔹 PREVIOUS PERIOD (30–60 days ago)

    const previousTotalUsers = await pool.query(`
      SELECT COUNT(*) AS count
      FROM public.users
      WHERE created_at <= NOW() - INTERVAL '30 days'
    `);

    const previousNewUsers = await pool.query(`
      SELECT COUNT(*) AS count
      FROM public.users
      WHERE created_at BETWEEN
        NOW() - INTERVAL '60 days'
        AND NOW() - INTERVAL '30 days'
    `);

    const previousActiveUsers = await pool.query(`
      SELECT COUNT(DISTINCT user_id) AS count
      FROM (
        SELECT user_id FROM public.transactions
        WHERE created_at BETWEEN
          NOW() - INTERVAL '60 days'
          AND NOW() - INTERVAL '30 days'
        UNION
        SELECT user_id FROM public.subscriptions
        WHERE started_at BETWEEN
          NOW() - INTERVAL '60 days'
          AND NOW() - INTERVAL '30 days'
      ) AS active_users
    `);

    const snapshot: UsersSnapshot = {
      type: "users",
      period: "last_30_days",
      current_period: {
        total_users: Number(currentTotalUsers.rows[0].count),
        new_users: Number(currentNewUsers.rows[0].count),
        active_users: Number(currentActiveUsers.rows[0].count),
      },
      previous_period: {
        total_users: Number(previousTotalUsers.rows[0].count),
        new_users: Number(previousNewUsers.rows[0].count),
        active_users: Number(previousActiveUsers.rows[0].count),
      },
    };

    const insights = await generateInsights(snapshot);

    res.json({
      snapshot,
      insights,
    });
  } catch (error) {
    console.error("Users insights error:", error);
    res.status(500).json({
      error: "Failed to generate users insights",
    });
  }
}
