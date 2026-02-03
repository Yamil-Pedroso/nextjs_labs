export type InsightType = "info" | "warning" | "success";

export interface Insight {
  id: string;
  title: string;
  description: string;
  type: InsightType;
}
