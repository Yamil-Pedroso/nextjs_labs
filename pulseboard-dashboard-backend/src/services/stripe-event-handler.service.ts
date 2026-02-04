import Stripe from "stripe";
import { handleInvoicePaymentSucceeded } from "./handlers/invoice-payment-suceeded.handler";
import { handleSubscriptionDeleted } from "./handlers/subscription-deletd.handler";

export class StripeEventHandler {
  static async handle(event: Stripe.Event): Promise<void> {
    switch (event.type) {
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event);
        break;

      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event);
        break;

      case "invoice.payment_failed":
        // await handleInvoicePaymentFailed(event);
        console.log("⚠️ Payment failed - handler not implemented yet");
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }
  }
}
