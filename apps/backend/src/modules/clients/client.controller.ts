import { Request, Response } from "express";
import * as clientService from "./client.service";

interface AuthRequest extends Request {
  userId?: string;
}

export async function createClient(req: AuthRequest, res: Response) {
  try {
    const { name, email, phone } = req.body;
    const client = await clientService.createClient(req.userId!, name, email, phone);
    res.status(201).json(client);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
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