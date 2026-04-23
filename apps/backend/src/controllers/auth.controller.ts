import { Request, Response } from "express";
import { registerService, loginService } from "../services/auth.service";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const user = await registerService(name, email, password);

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const token = await loginService(email, password);

    res.json({ token });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}