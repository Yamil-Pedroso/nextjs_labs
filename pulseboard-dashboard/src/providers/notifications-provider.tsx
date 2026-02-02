"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import {
  mockNotifications,
  welcomeNotification,
  type Notification,
} from "@/lib/notifications-data";
import { useAuth } from "@/providers/auth-provider";

interface NotificationsContextValue {
  notifications: Notification[];
  push: (notification: Notification) => void;
  start?: () => void;
}

const NotificationsContext = createContext<NotificationsContextValue | null>(
  null,
);

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const indexRef = useRef(0);
  const enabledRef = useRef(false);
  const welcomeShownRef = useRef(false);
  const welcomeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isAuthenticated } = useAuth();

  const push = useCallback((notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);

    setTimeout(() => {
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === notification.id ? { ...n, closing: true } : n,
        ),
      );
    }, 5000);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    }, 6000);
  }, []);

  const start = useCallback(() => {
    if (!enabledRef.current) {
      enabledRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      enabledRef.current = false;
      indexRef.current = 0;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNotifications([]);
      return;
    }

    enabledRef.current = true;

    const interval = setInterval(() => {
      if (!enabledRef.current) return;

      const data = mockNotifications[indexRef.current];

      push({
        ...data,
        id: crypto.randomUUID(),
      });

      indexRef.current = (indexRef.current + 1) % mockNotifications.length;
    }, 60_000);

    return () => {
      clearInterval(interval);
      enabledRef.current = false;
      indexRef.current = 0;
    };
  }, [isAuthenticated, push]);

  // Welcome notification, just once
  // React effect that runs whenever the authentication state changes
  useEffect(() => {
    // If the user is NOT authenticated (logout or initial state)
    if (!isAuthenticated) {
      // Reset the "welcome already shown" flag
      // so the welcome can appear again on the next login
      welcomeShownRef.current = false;

      // If there is a pending welcome timeout
      if (welcomeTimeoutRef.current) {
        // Cancel the scheduled welcome notification
        clearTimeout(welcomeTimeoutRef.current);

        // Clear the stored timeout reference
        welcomeTimeoutRef.current = null;
      }

      // Exit the effect early (nothing else should run when logged out)
      return;
    }

    // If the welcome notification was already scheduled or shown,
    // do nothing (prevents duplicates and Strict Mode double execution)
    if (welcomeShownRef.current) return;

    // Mark the welcome notification as scheduled/shown
    // BEFORE setting the timeout to avoid race conditions
    welcomeShownRef.current = true;

    // Schedule the welcome notification to appear 5 seconds after login
    welcomeTimeoutRef.current = setTimeout(() => {
      // Push the welcome notification into the notifications state
      push({
        ...welcomeNotification,
        id: crypto.randomUUID(),
      });
    }, 5000);

    // Cleanup function that runs:
    // - before the effect re-runs
    // - when the component unmounts
    return () => {
      // If there is still a scheduled timeout
      if (welcomeTimeoutRef.current) {
        // Cancel it to prevent memory leaks or ghost notifications
        clearTimeout(welcomeTimeoutRef.current);

        // Clear the timeout reference
        welcomeTimeoutRef.current = null;
      }
    };

    // Re-run this effect whenever authentication state changes
    // or when the push function reference changes
  }, [isAuthenticated, push]);

  return (
    <NotificationsContext.Provider value={{ notifications, push, start }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) {
    throw new Error(
      "useNotifications must be used inside NotificationsProvider",
    );
  }
  return ctx;
}
