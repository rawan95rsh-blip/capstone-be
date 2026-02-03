import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // 1. Read Authorization: Bearer <token>
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, error: "Access denied. No token provided." });
  }
  const token = authHeader.split(" ")[1];

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not set");
    return res.status(500).json({ success: false, error: "Server configuration error" });
  }

  try {
    // 2. Verify JWT
    const tokenValue = authHeader.split(" ")[1];
    if (!tokenValue) {
      return res.status(401).json({ success: false, error: "Invalid token format." });
    }
    const decoded = jwt.verify(tokenValue, secret) as unknown as { userId: string };    // 3. Attach userId to request
    (req as any).userId = decoded.userId;
    next();
  } catch {
    // 4. Reject invalid token (401)
    return res.status(401).json({ success: false, error: "Invalid or expired token." });
  }
};