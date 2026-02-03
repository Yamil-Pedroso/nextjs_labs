import { Router } from "express";
import { getInsights } from "../controllers/insightsController";

const router = Router();

router.get("/insights", getInsights);

export default router;
