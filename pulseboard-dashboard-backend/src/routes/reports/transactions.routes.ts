import { Router } from "express";
import { getTransactionsReport } from "../../controllers/reports/transactions.controller";

const router = Router();

router.get("/transactions", getTransactionsReport);

export default router;
