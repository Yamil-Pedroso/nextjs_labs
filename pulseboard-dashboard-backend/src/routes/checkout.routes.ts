import { Router } from "express";
import { createCheckoutSession } from "../controllers/checkout.controller";

const router = Router();

router.post("/checkout", createCheckoutSession);

export default router;
