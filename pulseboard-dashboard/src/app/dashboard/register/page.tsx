"use client";

import { useAuth } from "@/providers/auth-provider";
import { RegisterForm } from "@/components/auth/register-form";
import { redirect } from "next/navigation";

export default function DashboardRegister() {
  const { user } = useAuth();

  if (user) {
    redirect("/dashboard/overview");
  }

  return (
    <section className="px-6 py-10 max-w-sm">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      <RegisterForm />
    </section>
  );
}
