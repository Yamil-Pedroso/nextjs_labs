import { Request, Response } from "express";
import stripe from "../services/stripe";
import { StripeEventHandler } from "../services/stripe-event-handler.service";

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

  // 🔥 Delegar al service
  try {
    await StripeEventHandler.handle(event);
    res.json({ received: true });
  } catch (error) {
    console.error("❌ Error processing webhook:", error);
    res.status(500).json({ error: "Webhook processing failed" });
  }
}
