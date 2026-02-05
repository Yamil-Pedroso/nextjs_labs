// src/services/billing.service.ts
import { apiClient } from "@/api/client";

export interface PlansProps {
  id: string;
  name: string;
  price: number;
  interval: string;
}
interface CheckoutPayload {
  planId: string;
  userId: string;
}

export async function fetchPlans(): Promise<PlansProps> {
  const { data } = await apiClient.get<PlansProps>(`/plans`);
  console.log("Fetched plan details:", data);
  return data;
}

export async function createCheckoutSession(
  payload: CheckoutPayload,
): Promise<{ url: string }> {
  const { data } = await apiClient.post("/checkout", payload);
  return data;
}
