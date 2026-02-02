"use client";

import { useAuth } from "@/providers/auth-provider";
import { redirect } from "next/navigation";

export default function DashboardIndex() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    redirect("/dashboard/overview");
    //redirect("/dashboard/welcome");
  }

  redirect("/dashboard/overview");
}
