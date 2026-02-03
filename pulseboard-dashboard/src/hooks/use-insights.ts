"use client";

import { useEffect, useState } from "react";
import { fetchInsights } from "@/services/insights.service";
import type { Insight } from "@/lib/insight-types";

export function useInsights() {
  const [data, setData] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const insights = await fetchInsights();
        setData(insights);
      } catch (err) {
        setError("Failed to load insights");
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, []);

  return {
    data,
    loading,
    error,
  };
}
