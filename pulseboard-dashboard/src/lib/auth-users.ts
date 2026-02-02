export type UserRole = "business" | "enterprise";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export const mockAuthUsers: AuthUser[] = [
  {
    id: "u1",
    name: "Yami Business",
    email: "business@pulseboard.dev",
    role: "business",
    avatar: "/images/avatar/yami.jpg",
  },
  {
    id: "u2",
    name: "Yami Enterprise",
    email: "enterprise@pulseboard.dev",
    role: "enterprise",
    avatar: "/images/avatar/yami.jpg",
  },
];
