"use client";

import dynamic from "next/dynamic";
import { SidebarDesktop } from "@/components/sidebar/SidebarDesktop";
import { SidebarMobile } from "@/components/sidebar/SidebarMobile";

const Topbar = dynamic(
  () => import("@/components/topbar").then((mod) => ({ default: mod.Topbar })),
  { ssr: false },
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <SidebarDesktop />

      <div className="flex flex-1 flex-col">
        <Topbar>
          <SidebarMobile />
        </Topbar>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
