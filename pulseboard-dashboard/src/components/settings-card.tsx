import type { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function SettingsCard({
  title,
  description,
  action,
}: SettingsCardProps) {
  return (
    <div className="rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium text-[rgb(var(--text))]">
            {title}
          </h3>
          <p className="text-xs text-[rgb(var(--muted))]">{description}</p>
        </div>

        {action}
      </div>
    </div>
  );
}
