"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/providers/auth-provider";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  //const { isAuthenticated } = useAuth();
  //const router = useRouter();
  //
  //useEffect(() => {
  //  if (!isAuthenticated) {
  //    router.replace("/dashboard/welcome");
  //  }
  //}, [isAuthenticated, router]);
  //
  //if (!isAuthenticated) {
  //  return null;
  //}

  return <>{children}</>;
}
