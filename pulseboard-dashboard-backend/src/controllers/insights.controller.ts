import { Request, Response } from "express";
import { generateInsightsWithCache } from "../services/generateInsightsWithCache";

export const getInsights = async (_req: Request, res: Response) => {
  try {
    // ⚠️ Mock de métricas por ahora
    const metrics = {
      type: "revenue",
      period: "last_30_days",
      current_period: {
        revenue: 12400,
        transactions: 98,
        failed_payments: 12,
      },
      previous_period: {
        revenue: 15200,
        transactions: 121,
        failed_payments: 6,
      },
    };

    const insights = await generateInsightsWithCache(metrics);

    res.json({ insights });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to generate insights",
    });
  }
};
