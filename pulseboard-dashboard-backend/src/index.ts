import { app } from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`🚀 Pulseboard backend running on port ${PORT}`);
});
