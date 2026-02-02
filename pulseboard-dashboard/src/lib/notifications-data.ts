export type NotificationType = "success" | "info" | "error" | "welcome";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  closing?: boolean;
}

export const welcomeNotification: Omit<Notification, "id"> = {
  title: "Welcome to PulseBoard",
  message: "Your dashboard is ready 🚀",
  type: "welcome",
};

export const mockNotifications: Omit<Notification, "id">[] = [
  {
    title: "New user joined",
    message: "A new member has joined your workspace.",
    type: "info",
  },
  {
    title: "Plan upgraded",
    message: "Your subscription was upgraded to Pro.",
    type: "success",
  },
  {
    title: "Usage limit reached",
    message: "You are close to your monthly usage limit.",
    type: "error",
  },
];
