"use client";

import { LoginForm } from "@/components/auth/login-form";

export default function DashboardLoginPage() {
  return (
    <section className="px-6 py-10 max-w-sm">
      <h2 className="mb-4 text-xl font-semibold">Login</h2>
      <LoginForm />
    </section>
  );
}
