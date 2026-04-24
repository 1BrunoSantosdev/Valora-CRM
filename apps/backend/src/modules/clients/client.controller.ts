import { Request, Response } from "express";
import * as clientService from "./client.service";
import { prisma } from "../../lib/prisma";
import { AuthRequest } from "../../@types/auth";

export async function createClientService(
  userId: string,
  name: string,
  email?: string,
  phone?: string
) {
  try {
    const client = await prisma.client.create({
      data: {
        name,
        email,
        phone,
        userId,
      },
    });

    return client;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getClients(req: AuthRequest, res: Response) {
  try {
    const clients = await clientService.getClients(req.userId!);
    res.json(clients);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function list(req: AuthRequest, res: Response) {
  const clients = await clientService.listClients(req.userId!);

  return res.json(clients);
}

export async function createClient(req: AuthRequest, res: Response) {
  const { name, email, phone } = req.body;

  const client = await createClientService(
    req.userId!,
    name,
    email,
    phone
  );


  return res.status(201).json(client);
}

export async function updateClientStatus(
  req: AuthRequest,
  res: Response
) {
  try {
    const id = req.params.id as string;
    const { status } = req.body;

    const client = await clientService.updateClientStatusService(
      req.userId!,
      id,
      status
    );

    return res.json(client);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getMetrics(req: AuthRequest, res: Response) {
  const metrics = await clientService.getMetricsService(req.userId!);
  return res.json(metrics);
}

export async function searchClients(req: AuthRequest, res: Response) {
  const q = req.query.q as string;

  const clients = await clientService.searchClientsService(
    req.userId!,
    q
  );

  return res.json(clients);
}