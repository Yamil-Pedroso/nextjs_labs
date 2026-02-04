import { Request, Response } from "express";
import { pool } from "../config/db";
import { Plan } from "../models/plan.model";

export async function getPlans(_req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT id, name, price, interval
      FROM plans
      ORDER BY price ASC
    `);

    const plans: Plan[] = result.rows;

    res.json(plans);
  } catch (error) {
    console.error("Plans controller error:", error);
    res.status(500).json({ error: "Failed to load plans" });
  }
}
