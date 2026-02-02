"use client";

import { useCallback, useState } from "react";
import type { Notification } from "@/lib/notifications-data";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const push = useCallback((notification: Notification) => {
    setNotifications((prev) => [...prev, notification]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    }, 5000);
  }, []);

  return {
    notifications,
    push,
  };
}
