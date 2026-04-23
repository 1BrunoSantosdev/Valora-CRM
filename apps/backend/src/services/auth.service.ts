import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

    export async function registerService(name: string, email: string, password: string) {
    const userExists = await prisma.user.findUnique({
     where: { email },
    });

    if (userExists) {
    throw new Error("Email já cadastrado");
    }

     const hashedPassword = await bcrypt.hash(password, 10);

     const user = await prisma.user.create({
        data: {
        name,
        email,
        password: hashedPassword,
        },
    });

    return user;
}

export async function loginService(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Senha inválida");
  }

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );

  return token;
}