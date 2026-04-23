import { Router } from "express";
import { createClient, getClients } from "../controllers/client.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, createClient);
router.get("/", authMiddleware, getClients);

export default router;