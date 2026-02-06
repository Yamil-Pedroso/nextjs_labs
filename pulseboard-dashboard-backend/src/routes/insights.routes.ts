import { Router } from "express";
import { getInsights } from "../controllers/insights.controller";
import { getRevenueInsights } from "../controllers/insights/revenue.insight.controller";
import { getActivityInsights } from "../controllers/insights/activity.insight.controller";
import { getUsersInsights } from "../controllers/insights/users.insight.controller";

const router = Router();

router.get("/insights", getInsights);
router.get("/insights/revenue", getRevenueInsights);
router.get("/insights/activity", getActivityInsights);
router.get("/insights/users", getUsersInsights);

export default router;
