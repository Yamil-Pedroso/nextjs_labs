import { Request, Response } from "express";
import { pool } from "../../config/db";
import { generateInsightsWithCache } from "../../services/generateInsightsWithCache";

import type { ActivitySnapshot } from "../../types/activity";

export async function getActivityInsights(_req: Request, res: Response) {
  try {
    // 🔹 Current period (last 30 days)
    const currentActiveUsers = await pool.query(`
      SELECT COUNT(DISTINCT user_id) AS count
      FROM (
        SELECT user_id FROM public.transactions
        WHERE created_at >= NOW() - INTERVAL '30 days'
        UNION
        SELECT user_id FROM public.subscriptions
        WHERE started_at >= NOW() - INTERVAL '30 days'
      ) AS activity_users
    `);

    const currentNewUsers = await pool.query(`
      SELECT COUNT(*) AS count
      FROM public.users
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `);

    const currentActiveSubscriptions = await pool.query(`
      SELECT COUNT(*) AS count
      FROM public.subscriptions
      WHERE status = 'active'
      AND started_at >= NOW() - INTERVAL '30 days'
    `);

    const currentPendingSubscriptions = await pool.query(`
      SELECT COUNT(*) AS count
      FROM public.subscriptions
      WHERE status = 'pending'
      AND started_at >= NOW() - INTERVAL '30 days'
    `);

    const currentTransactions = await pool.query(`
      SELECT COUNT(*) AS count
      FROM public.transactions
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `);

    // 🔹 Previous period (30–60 days ago)
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
      ) AS activity_users
    `);

    const previousNewUsers = await pool.query(`
      SELECT COUNT(*) AS count
      FROM public.users
      WHERE created_at BETWEEN
        NOW() - INTERVAL '60 days'
        AND NOW() - INTERVAL '30 days'
    `);

    const previousActiveSubscriptions = await pool.query(`
      SELECT COUNT(*) AS count
      FROM public.subscriptions
      WHERE status = 'active'
      AND started_at BETWEEN
        NOW() - INTERVAL '60 days'
        AND NOW() - INTERVAL '30 days'
    `);

    const previousPendingSubscriptions = await pool.query(`
      SELECT COUNT(*) AS count
      FROM public.subscriptions
      WHERE status = 'pending'
      AND started_at BETWEEN
        NOW() - INTERVAL '60 days'
        AND NOW() - INTERVAL '30 days'
    `);

    const previousTransactions = await pool.query(`
      SELECT COUNT(*) AS count
      FROM public.transactions
      WHERE created_at BETWEEN
        NOW() - INTERVAL '60 days'
        AND NOW() - INTERVAL '30 days'
    `);

    const snapshot: ActivitySnapshot = {
      current_period: {
        active_users: Number(currentActiveUsers.rows[0].count),
        new_users: Number(currentNewUsers.rows[0].count),
        active_subscriptions: Number(currentActiveSubscriptions.rows[0].count),
        pending_subscriptions: Number(
          currentPendingSubscriptions.rows[0].count,
        ),
        transactions_count: Number(currentTransactions.rows[0].count),
      },
      previous_period: {
        active_users: Number(previousActiveUsers.rows[0].count),
        new_users: Number(previousNewUsers.rows[0].count),
        active_subscriptions: Number(previousActiveSubscriptions.rows[0].count),
        pending_subscriptions: Number(
          previousPendingSubscriptions.rows[0].count,
        ),
        transactions_count: Number(previousTransactions.rows[0].count),
      },
      type: "activity",
      period: "last_30_days",
    };

    // 🤖 IA analyzes snapshot
    const insights = await generateInsightsWithCache(snapshot);

    res.json({
      snapshot,
      insights,
    });
  } catch (error) {
    console.error("Activity insights error:", error);
    res.status(500).json({
      error: "Failed to generate activity insights",
    });
  }
}
