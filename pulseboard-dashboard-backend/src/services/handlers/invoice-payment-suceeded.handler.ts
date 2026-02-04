import Stripe from "stripe";
import stripe from "../stripe";
import { pool } from "../../config/db";

export async function handleInvoicePaymentSucceeded(
  event: Stripe.Event,
): Promise<void> {
  const invoice = event.data.object as Stripe.Invoice;

  // 🔥 FORMA CORRECTA: Usar parent.subscription_details.subscription
  const subscriptionId =
    invoice.parent?.type === "subscription_details"
      ? (invoice.parent.subscription_details?.subscription as string)
      : null;

  if (!subscriptionId) {
    console.log("ℹ️ Invoice without subscription");
    return;
  }

  console.log("🟢 Stripe subscription ID:", subscriptionId);

  // Obtener metadata
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const { userId, planId } = subscription.metadata;

  console.log("📦 Metadata:", { userId, planId });

  if (!userId) {
    throw new Error("Missing userId in subscription metadata");
  }

  // Activar suscripción
  const result = await pool.query(
    `
    UPDATE subscriptions
    SET status = 'active',
        stripe_subscription_id = $1
    WHERE user_id = $2 AND status = 'pending'
    RETURNING *
    `,
    [subscriptionId, userId],
  );

  console.log("✅ Rows updated:", result.rowCount);

  if (result.rowCount === 0) {
    console.log("⚠️ No pending subscription found for user:", userId);
    return;
  }

  // Registrar transacción
  await pool.query(
    `
    INSERT INTO transactions (user_id, amount, currency, status)
    VALUES ($1, $2, $3, 'success')
    `,
    [userId, invoice.amount_paid / 100, invoice.currency.toUpperCase()],
  );

  console.log("💰 Transaction recorded");
}
