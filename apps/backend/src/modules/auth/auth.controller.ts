import { Request, Response } from "express";
import * as authService from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await authService.register(name, email, password);

    res.status(201).json(user);
  } catch {
    res.status(400).json({ error: "Error registering user" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await authService.login(email, password);

    res.json(data);
  } catch {
    res.status(400).json({ error: "Invalid credentials" });
  }
};