import { Router } from "express";
import * as clientController from "./client.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, clientController.createClient);
router.get("/", authMiddleware, clientController.getClients);

export default router;