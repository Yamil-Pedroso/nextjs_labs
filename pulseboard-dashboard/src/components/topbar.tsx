"use client";

import { useState, useEffect } from "react";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ThemeSwitch } from "@/components/theme-switch";
import { LogoutButton } from "@/components/auth/logout-button";
import { useAuth } from "@/providers/auth-provider";
import { Avatar } from "./avatar";

const notificationsHardcoded = [
  { id: 1, message: "New user registered" },
  { id: 2, message: "Server CPU usage is high" },
  { id: 3, message: "New comment on your post" },
];

export function Topbar({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [click, setClick] = useState(false);
  const { user } = useAuth();

  const handleClick = () => setClick(!click);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(".notification-dropdown") &&
        !target.closest(".notification-button")
      ) {
        setClick(false);
      }
    };

    if (click) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [click]);

  return (
    <header className="flex items-center justify-between border-b border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-4">
      {/* Left */}
      <div className="flex items-center gap-4">
        {children}
        <h1 className="text-lg font-semibold text-[rgb(var(--text))]">
          Overview
        </h1>

        <div className="relative hidden md:block">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[rgb(var(--muted))]" />
          <input
            type="text"
            placeholder="Search..."
            className="w-64 rounded-lg border border-[rgb(var(--border))]
                       bg-[rgb(var(--bg))] py-2 pl-9 pr-3 text-sm
                       text-[rgb(var(--text))]
                       placeholder:text-[rgb(var(--muted))]
                       focus:outline-none focus:ring-1 focus:ring-[rgb(var(--border))]"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleClick}
          className="relative rounded-lg p-2 text-[rgb(var(--muted))]
                     hover:bg-[rgb(var(--border))]"
        >
          <BellIcon className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          {click && (
            <div
              className="absolute top-10 right-0  border w-64 rounded-lg
                       bg-[rgb(var(--card))] shadow-lg overflow-hidden"
            >
              <ul className="flex flex-col">
                {notificationsHardcoded.map((notification) => (
                  <li
                    key={notification.id}
                    className="border-b border-[rgb(var(--border))] px-4 py-2 text-sm text-[rgb(var(--text))]"
                  >
                    {notification.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </button>

        <ThemeSwitch />

        {user ? (
          <div className="flex items-center gap-3">
            <Avatar src="/images/avatar/yami.jpg" alt={user.name} />
            <LogoutButton />
          </div>
        ) : null}
      </div>
    </header>
  );
}
