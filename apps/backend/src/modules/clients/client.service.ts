import { prisma } from "../../lib/prisma";

export async function createClient(
  userId: string,
  name: string,
  email?: string,
  phone?: string
) {
  return prisma.client.create({
    data: { name, email, phone, userId },
  });
}

export async function getClients(userId: string) {
  return prisma.client.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}