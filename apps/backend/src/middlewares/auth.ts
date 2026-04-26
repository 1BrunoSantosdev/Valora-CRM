import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface AuthRequest extends Request {
  userId?: string;
  companyId?: string;
}

export function authMiddleware(
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ error: "No token" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { userId: string; companyId: string };

    if (!decoded.userId) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    req.userId = decoded.userId;

    req.companyId = decoded.companyId;

    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
