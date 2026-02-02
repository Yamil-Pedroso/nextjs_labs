"use client";

import { SettingsCard } from "@/components/settings-card";
import { ThemeSwitch } from "@/components/theme-switch";

export default function SettingsPage() {
  return (
    <section className="px-4 py-4 sm:p-6 space-y-6">
      <header>
        <h2 className="text-lg sm:text-xl font-semibold text-[rgb(var(--text))]">
          Settings
        </h2>
        <p className="text-sm text-[rgb(var(--muted))]">
          Manage your preferences
        </p>
      </header>

      <div className="space-y-4">
        <SettingsCard
          title="Theme"
          description="Switch between light and dark mode"
          action={<ThemeSwitch />}
        />
        <SettingsCard
          title="Notifications"
          description="Email and push notifications"
        />
        <SettingsCard
          title="Security"
          description="Update password and security settings"
        />
      </div>
    </section>
  );
}
