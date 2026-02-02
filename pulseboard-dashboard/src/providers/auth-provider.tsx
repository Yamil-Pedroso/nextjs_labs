"use client";

import { createContext, useContext, useState } from "react";
import { AuthUser } from "@/lib/auth-types";
import * as auth from "@/lib/auth";

interface AuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (name: string, email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() =>
    auth.getCurrentUser(),
  );

  function login(name: string, email: string, password: string) {
    const u = auth.loginUser(name, email, password);
    if (!u) return false;
    setUser(u);
    return true;
  }

  function register(name: string, email: string, password: string) {
    const u = auth.registerUser(name, email, password);
    setUser(u);
  }

  function logout() {
    auth.logoutUser();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
