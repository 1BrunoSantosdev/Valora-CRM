import { prisma } from "../lib/prisma";

export async function createClientService(
  userId: string,
  name: string,
  email?: string,
  phone?: string
) {
  const client = await prisma.client.create({
    data: {
      name,
      email,
      phone,
      userId,
    },
  });

  return client;
}

export async function getClientsService(userId: string) {
  return prisma.client.findMany({
    where: { userId },
  });
}