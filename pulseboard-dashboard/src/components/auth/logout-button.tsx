"use client";

import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <button
      onClick={() => {
        logout();
        router.replace("/dashboard");
      }}
      className={`text-sm text-red-500 hover:underline ${className}`}
    >
      Logout
    </button>
  );
}
