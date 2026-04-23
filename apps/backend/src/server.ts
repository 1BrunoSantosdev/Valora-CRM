import "dotenv/config";
import express from "express";
import authRoutes from "./routes/auth.routes";
import { authMiddleware } from "./middlewares/auth";
import { prisma } from "./lib/prisma";
import clientRoutes from "./routes/client.routes";

const app = express();

app.use(express.json());

// 🔥 rotas organizadas
app.use("/clients", clientRoutes);
app.use("/auth", authRoutes);

// 🔒 rota protegida
app.get("/profile", authMiddleware, async (req: any, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.userId },
  });

  res.json(user);
});

app.listen(3000, () => {
  console.log("Server running 🚀");
});