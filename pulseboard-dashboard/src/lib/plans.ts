export type Plan = "free" | "pro" | "enterprise";

export const PLANS = {
  free: {
    name: "Free",
    price: "0 CHF",
    description: "For individuals",
    features: ["Basic analytics", "Community support"],
  },
  pro: {
    name: "Pro",
    price: "29 CHF",
    description: "For growing teams",
    features: ["Advanced analytics", "Priority support"],
  },
  enterprise: {
    name: "Enterprise",
    price: "99 CHF",
    description: "For large organizations",
    features: ["Full analytics", "Dedicated support", "Custom features"],
  },
};
