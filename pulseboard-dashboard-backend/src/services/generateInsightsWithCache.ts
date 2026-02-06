import { pool } from "../config/db";
import { hashSnapshot } from "../utils/hashSnapshot";
import { generateInsights } from "./generateInsights";
import type { MetricsSnapshot } from "./generateInsights";
import type { Insight } from "../types/insight";
import { getCachedInsights } from "./insightsCache.service";

export async function generateInsightsWithCache(snapshot: MetricsSnapshot) {
  const snapshotHash = hashSnapshot(snapshot);

  const cached = await getCachedInsights(snapshotHash);

  if (cached) {
    console.log(
      `[INSIGHTS CACHE HIT] type=${snapshot.type} hash=${snapshotHash}`,
    );
    return cached;
  }

  console.log(
    `[INSIGHTS CACHE MISS → OPENAI] type=${snapshot.type} hash=${snapshotHash}`,
  );

  const insights = await generateInsights(snapshot);

  await pool.query(
    `
  INSERT INTO public.insights_cache (
    type,
    snapshot_hash,
    snapshot,
    insights
  )
  VALUES ($1, $2, $3::jsonb, $4::jsonb)
  ON CONFLICT (snapshot_hash) DO NOTHING
  `,
    [
      snapshot.type,
      snapshotHash,
      JSON.stringify(snapshot),
      JSON.stringify(insights),
    ],
  );

  return insights;
}
