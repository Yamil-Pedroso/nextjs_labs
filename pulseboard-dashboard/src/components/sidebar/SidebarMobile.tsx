
"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";

export function SidebarMobile() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* botón en topbar */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden p-2"
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* drawer */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64
          bg-[rgb(var(--bg))]
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Sidebar />
      </aside>
    </>
  );
}
