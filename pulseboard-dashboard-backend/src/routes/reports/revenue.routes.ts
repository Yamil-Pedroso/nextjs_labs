import { Router } from "express";
import { getRevenueReport } from "../../controllers/reports/revenue.controller";

const router = Router();

router.get("/revenue", getRevenueReport);

export default router;
