"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

import Link from "next/link";

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError("");

    const success = login(name, email, password);

    if (!success) {
      setError("Invalid credentials");
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        className="w-full rounded-lg border px-3 py-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="w-full rounded-lg border px-3 py-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full rounded-lg border px-3 py-2"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button className="w-full rounded-lg bg-[rgb(var(--primary))] py-2 font-semibold text-black">
        Login
      </button>

      <p className="text-sm text-center text-[rgb(var(--muted))]">
        Don’t have an account?{" "}
        <Link href="/dashboard/register" className="underline">
          Register
        </Link>
      </p>
    </form>
  );
}
