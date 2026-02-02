"use client";

import dynamic from "next/dynamic";

const Sidebar = dynamic(
  () =>
    import("@/components/sidebar").then((mod) => ({
      default: mod.Sidebar,
    })),
  { ssr: false },
);

const Topbar = dynamic(
  () =>
    import("@/components/topbar").then((mod) => ({
      default: mod.Topbar,
    })),
  { ssr: false },
);

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
