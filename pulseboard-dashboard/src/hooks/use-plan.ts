/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { fetchPlans, PlansProps } from "@/services/billing.service";
import type { Plan } from "@/lib/plans";

const STORAGE_KEY = "pulseboard_plan";

export function usePlans() {
  const [plans, setPlans] = useState<PlansProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlans() {
      try {
        setLoading(true);
        const data = await fetchPlans();
        setPlans(data as any);
      } catch {
        setError("Failed to load plans");
      } finally {
        setLoading(false);
      }
    }

    loadPlans();
  }, []);

  return { plans, loading, error };
}

export function usePlan() {
  const [plan, setPlan] = useState<Plan>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY) as Plan | null;
      return saved || "free";
    }
    return "free";
  });

  function selectPlan(newPlan: Plan) {
    setPlan(newPlan);
    localStorage.setItem(STORAGE_KEY, newPlan);
  }

  return { plan, selectPlan };
}
