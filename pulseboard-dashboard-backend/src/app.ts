import express from "express";
import cors from "cors";
import path from "path";
import insightsRoute from "./routes/insightsRoute";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname, "../config/config.env"),
});

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/v1", insightsRoute);
