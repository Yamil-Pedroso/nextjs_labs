export interface DashboardStats {
  revenue: number;
  users: number;
  growth: number;
  sessions: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    revenue: 24300,
    users: 1284,
    growth: 18,
    sessions: 9832,
  };
}
