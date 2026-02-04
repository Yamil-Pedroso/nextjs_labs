import { Router } from "express";
import { getActivityReport } from "../../controllers/reports/activity.controller";

const router = Router();

router.get("/activity", getActivityReport);

export default router;
