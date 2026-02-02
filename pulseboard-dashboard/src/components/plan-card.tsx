interface PlanCardProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  selected: boolean;
  onSelect: () => void;
  highlighted?: boolean;
}

export function PlanCard({
  name,
  price,
  description,
  features,
  selected,
  onSelect,
  highlighted,
}: PlanCardProps) {
  return (
    <div
      className={`rounded-xl border p-6 flex flex-col transition
        ${
          selected
            ? "border-[rgb(var(--primary))] bg-[rgb(var(--primary))]/10"
            : "border-[rgb(var(--border))] bg-[rgb(var(--card))]"
        }`}
    >
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="mt-1 text-sm text-[rgb(var(--muted))]">{description}</p>

      <div className="my-4">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-sm text-[rgb(var(--muted))]"> / month</span>
      </div>

      <ul className="mb-6 space-y-2 text-sm">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2">
            <span className="text-[rgb(var(--primary))]">✔</span>
            {f}
          </li>
        ))}
      </ul>

      <button
        onClick={onSelect}
        disabled={selected}
        className={`mt-auto w-full rounded-lg px-4 py-2 text-sm font-medium transition
          ${
            selected
              ? "bg-[rgb(var(--border))] text-[rgb(var(--muted))] cursor-not-allowed"
              : "bg-[rgb(var(--primary))] text-black hover:opacity-90"
          }`}
      >
        {selected ? "Current Plan" : "Choose Plan"}
      </button>
    </div>
  );
}
