import { pool } from "../config/db";

export async function getCachedInsights(snapshotHash: string) {
  const result = await pool.query(
    `
    SELECT insights
    FROM public.insights_cache
    WHERE snapshot_hash = $1
    LIMIT 1
    `,
    [snapshotHash],
  );

  return result.rows[0]?.insights ?? null;
}
