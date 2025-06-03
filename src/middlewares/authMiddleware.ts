import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config/constants";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido" });
  }
}
