import { Request, Response } from "express";
import stripe from "../services/stripe";
import { pool } from "../config/db";

export async function createCheckoutSession(req: Request, res: Response) {
  const { planId, userId } = req.body;

  try {
    console.log("🟡 CHECKOUT:", { userId, planId });

    // 1️⃣ Validar plan
    const planResult = await pool.query(`SELECT * FROM plans WHERE id = $1`, [
      planId,
    ]);

    if (!planResult.rows.length) {
      return res.status(404).json({ error: "Plan not found" });
    }

    const plan = planResult.rows[0];

    // 2️⃣ 🔥 PERSISTIR INTENCIÓN (AQUÍ ESTÁ LA CLAVE)
    await pool.query(
      `
      INSERT INTO subscriptions (user_id, plan_id, status)
      VALUES ($1, $2, 'pending')
      ON CONFLICT (user_id) DO UPDATE
      SET plan_id = $2, status = 'pending'
      `,
      [userId, planId],
    );

    console.log("🟢 Subscription intent stored (pending)");

    // 3️⃣ Crear sesión Stripe
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],

      customer_email: `yamirovinci+${Date.now()}@gmail.com`,

      subscription_data: {
        metadata: {
          userId,
          planId,
        },
      },

      line_items: [
        {
          price_data: {
            currency: "chf",
            product_data: {
              name: plan.name,
            },
            unit_amount: plan.price * 100,
            recurring: {
              interval: plan.interval, // month
            },
          },
          quantity: 1,
        },
      ],

      success_url: process.env.STRIPE_SUCCESS_URL!,
      cancel_url: process.env.STRIPE_CANCEL_URL!,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("❌ Stripe checkout error:", error);
    res.status(500).json({ error: "Stripe checkout failed" });
  }
}
