import { Router } from "express";
import { getUsersReport } from "../../controllers/reports/users.controller";

const router = Router();

router.get("/users", getUsersReport);

export default router;
