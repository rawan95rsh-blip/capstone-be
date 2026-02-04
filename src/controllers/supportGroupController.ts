import { Request, Response } from "express";
import SupportGroup from "../models/SupportGroupModel";
import mongoose from "mongoose";


export const createGroup = async (req: Request, res: Response) => {
  try {
    const { title, description, supporterName, supporterRole, tags } = req.body;
    const newGroup = await SupportGroup.create({
      title,
      description,
      supporterName,
      supporterRole,
      tags: tags || [],
    });
    return res.status(201).json({ success: true, data: newGroup });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getGroups = async (req: Request, res: Response) => {
    try {
      const groups = await SupportGroup.find()
        .select("title _id")
        .sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: groups });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  };

  export const getGroupById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const groupId = typeof id === "string" ? id : Array.isArray(id) ? id[0] ?? "" : "";
  
        // 1. Validate groupId
        if (!groupId || !mongoose.Types.ObjectId.isValid(groupId)) {
          return res.status(400).json({ success: false, error: "Invalid group ID" });
        }
  
        const group = await SupportGroup.findById(groupId);
        if (!group) {
          return res.status(404).json({ success: false, error: "Group not found" });
        }
        return res.status(200).json({ success: true, data: group });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  };



  export const updateGroup = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, supporterName, supporterRole, tags } = req.body;
      const group = await SupportGroup.findByIdAndUpdate(
        id,
        { title, description, supporterName, supporterRole, tags },
        { new: true, runValidators: true }
      );
      if (!group) {
        return res.status(404).json({ success: false, error: "Group not found" });
      }
      return res.status(200).json({ success: true, data: group });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  };

  export const deleteGroup = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const group = await SupportGroup.findByIdAndDelete(id);
      if (!group) {
        return res.status(404).json({ success: false, error: "Group not found" });
      }
      return res.status(200).json({ success: true, data: { message: "Group deleted successfully" } });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  };