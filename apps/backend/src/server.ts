import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import clientRoutes from "./modules/clients/client.routes";
import { authMiddleware } from "./middlewares/auth";
import { prisma } from "./lib/prisma";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/clients", authMiddleware,clientRoutes);

app.get("/profile", authMiddleware, async (req: any, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
    select: { id: true, name: true, email: true, createdAt: true },
  });
  res.json(user);
});

app.listen(3000, () => {
  console.log("Server running on port 3000 🚀");
});