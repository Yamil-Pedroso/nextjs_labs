import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-[rgb(var(--muted))]">{title}</p>
          <p className="mt-1 text-2xl font-semibold text-[rgb(var(--text))]">
            {value}
          </p>
        </div>

        <div className="rounded-lg bg-[rgb(var(--border))]/40 p-3">{icon}</div>
      </div>
    </div>
  );
}
