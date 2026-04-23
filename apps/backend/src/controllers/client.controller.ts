import { Request, Response } from "express";
import { createClientService, getClientsService } from "../services/client.service";

export async function createClient(req: any, res: Response) {
  try {
    const { name, email, phone } = req.body;

    const client = await createClientService(
      req.userId,
      name,
      email,
      phone
    );

    res.status(201).json(client);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function getClients(req: any, res: Response) {
  const clients = await getClientsService(req.userId);
  res.json(clients);
}