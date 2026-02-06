import { Request, Response } from "express";
import { pool } from "../config/db";

export async function getProducts(_req: Request, res: Response) {
  try {
    const result = await pool.query(`
      SELECT
        id,
        name,
        slug,
        description,
        logo_url,
        created_at
      FROM public.products
      ORDER BY created_at DESC
    `);

    console.log("Fetched products:", result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      error: "Failed to fetch products",
    });
  }
}
