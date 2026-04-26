import { prisma } from "../../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function register(
  name: string,
  email: string,
  password: string
) {
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

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) throw new Error("Usuário não encontrado");

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) throw new Error("Senha inválida");

   const token = jwt.sign(
   {
      userId: user.id,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
    );

  return { token };
}
export function generateToken(user: any) {
  return jwt.sign(
    {
      userId: user.id,
      companyId: user.companyId,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "1d" }
  );
}