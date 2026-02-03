"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
//import { FaWandMagicSparkles } from "react-icons/fa6";

interface NavItem {
  name: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export function Sidebar() {
  const pathname = usePathname();
  //const { isAuthenticated } = useAuth();
  //
  //const preAuth: NavItem[] = [
  //  { name: "Welcome", href: "/dashboard/welcome" },
  //  { name: "Login", href: "/dashboard/login" },
  //  { name: "Register", href: "/dashboard/register" },
  //  {
  //    name: "Shadowpass to Dashboard",
  //    href: "/dashboard",
  //    icon: FaWandMagicSparkles,
  //  },
  //];

  const postAuth: NavItem[] = [
    { name: "Overview", href: "/dashboard/overview", icon: HomeIcon },
    { name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon },
    { name: "Reports", href: "/dashboard/reports", icon: DocumentChartBarIcon },
    { name: "Activity", href: "/dashboard/activity", icon: ClockIcon },
    { name: "Users", href: "/dashboard/users", icon: UsersIcon },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCardIcon },
    { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
  ];

  //const nav = isAuthenticated ? postAuth : preAuth;
  const nav = postAuth;

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-[rgb(var(--border))] p-4">
      <h1 className="mb-6 font-bold">PulseBoard</h1>

      <nav className="flex flex-1 flex-col space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition
                ${
                  active
                    ? "bg-[rgb(var(--primary))] text-black"
                    : "text-[rgb(var(--muted))] hover:bg-[rgb(var(--primary))]/30"
                }`}
            >
              {item.icon && <item.icon className="h-4 w-4" />}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
