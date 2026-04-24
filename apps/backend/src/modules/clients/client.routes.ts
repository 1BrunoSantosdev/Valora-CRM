import { Router } from "express";
import { createClient, getClients, getMetrics, searchClients, updateClientStatus } from "./client.controller"; 
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post("/", authMiddleware, createClient);
router.get("/", authMiddleware, getClients);
router.patch("/:id/status", authMiddleware, updateClientStatus);
router.get("/metrics", authMiddleware, getMetrics);
router.get("/search", authMiddleware, searchClients);

export default router;