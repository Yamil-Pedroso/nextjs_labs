interface StatusItem {
  label: string;
  status: "ok" | "warning" | "error";
}

const statusItems: StatusItem[] = [
  { label: "API", status: "ok" },
  { label: "Database", status: "ok" },
  { label: "Background Jobs", status: "warning" },
];

export function SystemStatus() {
  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4">
      <h3 className="mb-3 text-sm font-semibold text-[rgb(var(--text))]">
        System Status
      </h3>

      <ul className="space-y-2">
        {statusItems.map((item) => (
          <li
            key={item.label}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-[rgb(var(--muted))]">{item.label}</span>

            <span
              className={`h-2.5 w-2.5 rounded-full ${
                item.status === "ok"
                  ? "bg-green-500"
                  : item.status === "warning"
                    ? "bg-yellow-500"
                    : "bg-red-500"
              }`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
