"use client";

import { useState } from "react";
import type { Plan } from "@/lib/plans";

const STORAGE_KEY = "pulseboard_plan";

export function usePlan() {
  const [plan, setPlan] = useState<Plan>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY) as Plan | null;
      return saved || "basic";
    }
    return "basic";
  });

  function selectPlan(newPlan: Plan) {
    setPlan(newPlan);
    localStorage.setItem(STORAGE_KEY, newPlan);
  }

  return { plan, selectPlan };
}
