import { Request, Response } from "express";
import { generateInsights } from "../services/generateInsights";

export const getInsights = async (_req: Request, res: Response) => {
  try {
    // ⚠️ Mock de métricas por ahora
    // Luego esto vendrá de DB / Stripe / Events
    const metrics = {
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

    const insights = await generateInsights(metrics);

    res.json({ insights });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to generate insights",
    });
  }
};
