export interface UsersMetric {
  totalUsers: number;
  newUsers: number;
  activeUsers: number;
  period: string;
}

export const USERS: UsersMetric = {
  totalUsers: 5400,
  newUsers: 450,
  activeUsers: 3200,
  period: "Last 30 days",
};
