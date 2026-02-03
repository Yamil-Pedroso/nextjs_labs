export interface ActivityMetric {
  sessions: number;
  avgSessionsPerUser: number;
  activeRate: number;
  period: string;
}

export const ACTIVITY: ActivityMetric = {
  sessions: 12500,
  avgSessionsPerUser: 3.2,
  activeRate: 58.4,
  period: "Last 30 days",
};
