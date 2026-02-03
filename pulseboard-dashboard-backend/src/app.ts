import express from "express";
import cors from "cors";
import insightsRoute from "./routes/insightsRoute";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1", insightsRoute);
