"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/dashboard/welcome");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null; // evita flicker
  }

  return <>{children}</>;
}
