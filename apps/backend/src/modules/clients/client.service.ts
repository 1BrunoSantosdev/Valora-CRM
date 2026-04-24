import { prisma } from "../../lib/prisma";

export async function createClient(
  name: string,
  email: string,
  userId: string
) {
  return prisma.client.create({
    data: {
      name,
      email,
      userId,
    },
  });
}

export async function getClients(userId: string) {
  return prisma.client.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}


export async function listClients(userId: string) {
  return prisma.client.findMany({
    where: {
      userId,
    },
  });
}

export async function updateClientStatusService(
  userId: string,
  clientId: string,
  status: string
) {
  const client = await prisma.client.findFirst({
    where: {
      id: clientId,
      userId, 
    },
  });

  if (!client) {
    throw new Error("Cliente não encontrado");
  }

  const updatedClient = await prisma.client.update({
    where: { id: clientId },
    data: { status },
  });

  return updatedClient;
}

export async function getClientsService(
  userId: string,
  status?: string
) {
  return prisma.client.findMany({
    where: {
      userId,
      ...(status && { status }),
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getMetricsService(userId: string) {
  const [lead, negociando, fechado, perdido] = await Promise.all([
    prisma.client.count({ where: { userId, status: "lead" } }),
    prisma.client.count({ where: { userId, status: "negociando" } }),
    prisma.client.count({ where: { userId, status: "fechado" } }),
    prisma.client.count({ where: { userId, status: "perdido" } }),
  ]);

  return { lead, negociando, fechado, perdido };
}

export async function searchClientsService(
  userId: string,
  query: string
) {
  return prisma.client.findMany({
    where: {
      userId,
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });
}