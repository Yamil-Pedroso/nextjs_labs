import { Request, Response } from "express";
import { pool } from "../../config/db";
import { UsersMetric } from "../../models/user.model";

export async function getUsersReport(_req: Request, res: Response) {
  try {
    // Total users
    const totalResult = await pool.query(`
      SELECT COUNT(*)::int AS total
      FROM users
    `);

    // New users (last 30 days)
    const newResult = await pool.query(`
      SELECT COUNT(*)::int AS new_users
      FROM users
      WHERE created_at >= NOW() - INTERVAL '30 days'
    `);

    // Active users (placeholder realista por ahora)
    const totalUsers = totalResult.rows[0].total;
    const activeUsers = Math.floor(totalUsers * 0.6); // 60% active (OK for now)

    const response: UsersMetric = {
      totalUsers,
      newUsers: newResult.rows[0].new_users,
      activeUsers,
      period: "Last 30 days",
    };

    res.json(response);
  } catch (error) {
    console.error("Users report error:", error);
    res.status(500).json({ error: "Failed to load users report" });
  }
}
