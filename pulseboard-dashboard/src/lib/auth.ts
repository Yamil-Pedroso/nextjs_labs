import { AuthUser } from "./auth-types";

const STORAGE_KEY = "pulseboard_user";

export function getCurrentUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? (JSON.parse(raw) as AuthUser) : null;
}

export function loginUser(
  name: string,
  email: string,
  password: string,
): AuthUser | null {
  if (
    name === "yami" &&
    email === "yami@example.com" &&
    password === "123456"
  ) {
    const user: AuthUser = { name, email, avatar: "/default-avatar.png" };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  }

  return null;
}

export function registerUser(
  name: string,
  email: string,
  password: string,
): AuthUser {
  const user: AuthUser = { name, email, avatar: "/default-avatar.png" };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function logoutUser() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
