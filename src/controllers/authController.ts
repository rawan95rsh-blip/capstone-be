import { Request, Response } from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // 1. Validate body
    if (!username || !password || typeof username !== "string" || typeof password !== "string" || !username.trim() || !password.trim()) {
      return res.status(400).json({ success: false, error: "Username and password are required" });
    }

    // 2. Find user by username
    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // 3. Compare password with bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // 4. Create JWT token
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not set");
      return res.status(500).json({ success: false, error: "Server configuration error" });
    }
    const token = jwt.sign(
      { userId: user._id },
      secret,
      { expiresIn: "7d" }
    );

    // 5. Return token + user public profile
    const publicProfile = {
      _id: user._id,
      username: user.username,
    };
    return res.status(200).json({
      success: true,
      data: { token, user: publicProfile },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};