import {Request, Response} from "express";
import User from "../models/UserModel";
import bcrypt from "bcrypt";

// Create a new user

export const createUser = async (req: Request, res: Response) => {
   try {
    const { username, password } = req.body;

    const salt = Number(process.env.SALT)

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: "User created successfully", newUser });
   } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
   }
}

// Get all users

// Get a user by id

// Update a user by id

// Delete a user by id