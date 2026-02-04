import dotenv from "dotenv";
import path from "path";

dotenv.config({
  path: path.resolve(__dirname, "./config/config.env"),
});
import { app } from "./app";
import { pool } from "./config/db";

const PORT = process.env.PORT || 3010;

async function startServer() {
  try {
    await pool.query("SELECT 1");
    console.log("✅ DB connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to DB", error);
    process.exit(1);
  }
}

startServer();
