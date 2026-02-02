"use client";

import { useNotifications } from "@/providers/notifications-provider";
import { NotificationItem } from "./notification-item";

export function NotificationsContainer() {
  const { notifications } = useNotifications();

  if (!notifications.length) return null;

  return (
    <div className="fixed right-6 top-6 z-50 flex flex-col gap-3">
      {notifications.map((n) => (
        <NotificationItem key={n.id} notification={n} />
      ))}
    </div>
  );
}
