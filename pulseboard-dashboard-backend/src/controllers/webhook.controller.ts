import { Request, Response } from "express";
import stripe from "../services/stripe";
import { pool } from "../config/db";

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers["stripe-signature"] as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send("Webhook Error");
  }

  console.log("🔥 WEBHOOK EVENT:", event.type);

  // ✅ SOLO el evento correcto para activar suscripciones
  if (event.type !== "invoice.payment_succeeded") {
    return res.json({ received: true });
  }

  const invoice = event.data.object as any;

  if (!invoice.subscription) {
    console.log("ℹ️ Invoice without subscription, skipping");
    return res.json({ received: true });
  }

  // 🔍 Recuperar la subscription real de Stripe
  const subscription = await stripe.subscriptions.retrieve(
    invoice.subscription as string,
  );

  console.log("🟣 SUBSCRIPTION METADATA:", subscription.metadata);

  const userId = subscription.metadata?.userId;
  const planId = subscription.metadata?.planId;

  if (!userId || !planId) {
    console.log("⚠️ Missing metadata, skipping");
    return res.json({ received: true });
  }

  // 1️⃣ Activar suscripción
  await pool.query(
    `
    UPDATE subscriptions
    SET status = 'active'
    WHERE user_id = $1
    `,
    [userId],
  );

  console.log("✅ Subscription activated");

  // 2️⃣ Registrar transacción (solo una por invoice)
  await pool.query(
    `
    INSERT INTO transactions (user_id, amount, currency, status)
    VALUES ($1, $2, $3, 'success')
    `,
    [userId, invoice.amount_paid / 100, invoice.currency.toUpperCase()],
  );

  console.log("💰 Transaction stored");

  res.json({ received: true });
}
