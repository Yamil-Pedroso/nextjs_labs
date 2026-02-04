import Stripe from "stripe";
import stripe from "../stripe";
import { pool } from "../../config/db";

export async function handleSubscriptionDeleted(
  event: Stripe.Event,
): Promise<void> {
  const subscription = event.data.object as Stripe.Subscription;
  const { userId } = subscription.metadata;

  if (!userId) {
    console.log("⚠️ No userId in subscription metadata");
    return;
  }

  // Cancelar suscripción en DB
  await pool.query(
    `
    UPDATE subscriptions
    SET status = 'cancelled'
    WHERE user_id = $1 AND stripe_subscription_id = $2
    `,
    [userId, subscription.id],
  );

  console.log("✅ Subscription cancelled for user:", userId);
}
