import { Request, Response } from "express";
import Session from "../models/SessionModel";

export const createSession = async (req: Request, res: Response) => {
  try {
    const newSession = await Session.create(req.body);
    return res.status(201).json({ success: true, data: newSession });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getSessions = async (req: Request, res: Response) => {
  try {
    const sessions = await Session.find().sort({ date: 1, time: 1 });
    const data = sessions.map((s) => ({
      id: s._id.toString(),
      name: s.name,
      providerId: s.providerId,
      providerName: s.providerName,
      date: s.date,
      time: s.time,
      durationMinutes: s.durationMinutes,
      format: s.format,
      description: s.description,
      availability: s.availability,
      language: s.language,
      enrolledCount: s.enrolledCount,
      maxParticipants: s.maxParticipants,
    }));
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getSessionById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const sessionId = typeof id === "string" ? id : Array.isArray(id) ? id[0] ?? "" : "";
    if (!sessionId) {
      return res.status(400).json({ success: false, error: "Invalid session ID" });
    }
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ success: false, error: "Session not found" });
    }
    const data = {
      id: session._id.toString(),
      name: session.name,
      providerId: session.providerId,
      providerName: session.providerName,
      date: session.date,
      time: session.time,
      durationMinutes: session.durationMinutes,
      format: session.format,
      description: session.description,
      availability: session.availability,
      language: session.language,
      enrolledCount: session.enrolledCount,
      maxParticipants: session.maxParticipants,
    };
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};