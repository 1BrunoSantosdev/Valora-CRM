import { Request, Response, NextFunction } from "express";

export function tenantMiddleware(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = require("jsonwebtoken").verify(
      token,
      process.env.JWT_SECRET!
    );

    req.userId = decoded.userId;
    req.tenantId = decoded.tenantId;

    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}