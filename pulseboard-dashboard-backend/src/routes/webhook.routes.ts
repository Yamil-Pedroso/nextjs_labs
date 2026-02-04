import { Router } from "express";
import express from "express";
import { handleStripeWebhook } from "../controllers/webhook.controller";

const router = Router();

// ⚠️ IMPORTANTE: raw body SOLO para Stripe webhook
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook,
);

export default router;
