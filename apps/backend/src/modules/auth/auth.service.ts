import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const register = async (name: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const company = await prisma.company.create({
    data: {
      name: `${name}'s Company`,
    },
  });

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      companyId: company.id,
    },
  });

  return user;
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error("User not found");

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) throw new Error("Invalid password");

  const token = jwt.sign(
    { userId: user.id, companyId: user.companyId },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { token };
};