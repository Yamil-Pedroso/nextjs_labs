import { useState } from "react";
import { createCheckoutSession } from "@/services/billing.service";

export function useCheckout(userId: string) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout(planId: string) {
    try {
      setLoading(true);
      setError(null);

      const { url } = await createCheckoutSession({
        userId,
        planId,
      });

      // 🔥 redirección directa a Stripe
      window.location.href = url;
    } catch (err) {
      console.error(err);
      setError("Failed to start checkout");
    } finally {
      setLoading(false);
    }
  }

  return {
    checkout,
    loading,
    error,
  };
}
