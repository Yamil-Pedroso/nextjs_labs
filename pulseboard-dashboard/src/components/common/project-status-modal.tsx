"use client";

import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function ProjectStatusModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/40 backdrop-blur-sm
      "
    >
      <div
        className="
          relative w-full max-w-md
          rounded-2xl border border-[rgb(var(--border))]
          bg-[rgb(var(--card))]
          p-6 shadow-xl
          animate-slide-in
        "
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="
            absolute top-3 right-3
            rounded-md p-1
            text-[rgb(var(--muted))]
            hover:bg-[rgb(var(--border))]/40
            transition
          "
        >
          <XMarkIcon className="h-5 w-5" />
        </button>

        {/* Content */}
        <h2 className="text-lg font-semibold">PulseBoard is in progress 🚧</h2>

        <p className="mt-2 text-sm text-[rgb(var(--muted))] leading-relaxed">
          This project is currently under active development.
          <br />
          <br />
          Feel free to explore the features that have already been built and get
          a preview of what’s coming next.
        </p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setOpen(false)}
            className="
              rounded-lg bg-[rgb(var(--primary))]
              px-4 py-2 text-sm font-medium
              text-black hover:opacity-90
              transition
            "
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
