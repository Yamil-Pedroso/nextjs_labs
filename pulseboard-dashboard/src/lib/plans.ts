export type Plan = "basic" | "standard" | "pro";

export const PLANS = {
  basic: {
    name: "Basic",
    price: "8 CHF",
    description: "For individuals",
    features: ["Up to 3 users", "Basic analytics", "Email support"],
  },
  standard: {
    name: "Standard",
    price: "19 CHF",
    description: "For small teams",
    features: ["Up to 10 users", "Advanced analytics", "Priority support"],
  },
  pro: {
    name: "Pro",
    price: "29 CHF",
    description: "For growing businesses",
    features: ["Unlimited users", "Full analytics", "Dedicated support"],
  },
};
