import { PlansProps } from "@/services/billing.service";

export function PlansTestCard({ plan }: { plan: PlansProps }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">{plan.name}</h2>
      <p className="text-lg mb-2">
        Price: ${plan.price} / {plan.interval}
      </p>
      <p className="text-sm text-gray-600">Plan ID: {plan.id}</p>
    </div>
  );
}
