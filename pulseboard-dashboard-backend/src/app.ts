import express from "express";
import cors from "cors";
import path from "path";
import bodyParser from "body-parser";
import transactionsRoute from "./routes/reports/transactions.routes";
import revenueRoutes from "./routes/reports/revenue.routes";
import insightsRoute from "./routes/insights.routes";
import usersRoutes from "./routes/reports/users.routes";
import activityRoutes from "./routes/reports/activity.routes";
import plansRoutes from "./routes/plans.routes";
import productsRoutes from "./routes/products.routes";
import checkoutRoutes from "./routes/checkout.routes";
//import webhookRoutes from "./routes/webhook.routes";
import { handleStripeWebhook } from "./controllers/webhook.controller";

export const app = express();

console.log("🔥 EXPRESS APP STARTED");

app.post(
  "/api/v1/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook,
);

app.use(cors({ origin: "*" }));

app.use(express.json());

app.use((req, _res, next) => {
  console.log("➡️ Incoming request:", req.method, req.url);
  next();
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1", insightsRoute);
app.use("/api/v1", transactionsRoute);
app.use("/api/v1", revenueRoutes);
app.use("/api/v1", usersRoutes);
app.use("/api/v1", activityRoutes);
app.use("/api/v1", plansRoutes);
app.use("/api/v1", productsRoutes);
app.use("/api/v1", checkoutRoutes);
