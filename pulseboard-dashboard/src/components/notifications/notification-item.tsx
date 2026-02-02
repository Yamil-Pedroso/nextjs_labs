import type { Notification } from "@/lib/notifications-data";

export function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
  const colors = {
    welcome: "border-purple-400 text-purple-400",
    success: "border-green-400 text-green-400",
    info: "border-blue-400 text-blue-400",
    error: "border-red-400 text-red-400",
  };

  return (
    <div
      className={`w-80 rounded-lg border-l-4 bg-[rgb(var(--card))] p-4 shadow-lg
                  ${colors[notification.type]}
                  animate-slide-in  ${
                    notification.closing
                      ? "animate-slide-out"
                      : "animate-slide-in"
                  }`}
    >
      <p className="text-sm font-semibold">{notification.title}</p>
      <p className="mt-1 text-sm text-[rgb(var(--muted))]">
        {notification.message}
      </p>
    </div>
  );
}
