import { Router } from "express";
import { getPlans } from "../controllers/plan.controller";

const router = Router();

router.get("/plans", getPlans);

export default router;
