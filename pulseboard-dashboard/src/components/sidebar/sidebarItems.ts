import {
  Home,
  BarChart3,
  CreditCard,
  Users,
  Settings,
} from "lucide-react";

export const sidebarItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: CreditCard,
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
];

export const sidebarSecondaryItems = [
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
