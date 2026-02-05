import {Request, Response} from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// Create a new user

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, avatarId } = req.body;

    const salt = Number(process.env.SALT);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      avatarId: avatarId ?? "",
    });

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is not set");
      return res.status(500).json({ success: false, error: "Server configuration error" });
    }
    const token = jwt.sign(
      { userId: newUser._id },
      secret,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      success: true,
      data: {
        token,
        user: { _id: newUser._id, username: newUser.username },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
    console.error(error);
  }
};

export const getMe = async (req: Request, res: Response) => {
   try {
     const userId = (req as any).userId;
     const user = await User.findById(userId).select("-password");
     if (!user) {
       return res.status(404).json({ success: false, error: "User not found" });
     }
     return res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        avatarId: (user as any).avatarId ?? "",
      },
    });
     } catch (error) {
     console.error(error);
     return res.status(500).json({ success: false, error: "Internal server error" });
   }
 };

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Get a user by id
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Update a user by id (authenticated user can update only their own profile)
export const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    if (userId !== id) {
      return res.status(403).json({ success: false, error: "You can only update your own profile" });
    }
    const { username, avatarId, password } = req.body;
    const updateData: Record<string, unknown> = {};
    if (username !== undefined) updateData.username = username;
    if (avatarId !== undefined) updateData.avatarId = avatarId;
    if (password !== undefined && password.trim() !== "") {
      const salt = Number(process.env.SALT);
      updateData.password = await bcrypt.hash(password, salt);
    }
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ success: false, error: "No valid fields to update" });
    }
    const user = await User.findByIdAndUpdate(id, updateData, { new: true }).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

// Delete a user by id (authenticated user can delete only their own account)
export const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    if (userId !== id) {
      return res.status(403).json({ success: false, error: "You can only delete your own account" });
    }
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};