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
    const sessions = await Session.find().populate("providerId").sort({ date: 1, time: 1 });
    const data = sessions.map((s) => {
      const provider = s.providerId as { _id?: unknown; name?: string } | null;
      return {
        id: s._id.toString(),
        name: s.name,
        providerId: provider?._id != null ? String(provider._id) : s.providerId?.toString(),
        providerName: provider?.name ?? "",
        date: s.date,
        time: s.time,
        durationMinutes: s.durationMinutes,
        format: s.format,
        description: s.description,
        availability: s.availability,
        language: s.language,
        enrolledCount: s.enrolledCount,
        maxParticipants: s.maxParticipants,
        meetingUrl: s.meetingUrl ?? undefined,
      };
    });
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
    const session = await Session.findById(sessionId).populate("providerId");
    if (!session) {
      return res.status(404).json({ success: false, error: "Session not found" });
    }
    const provider = session.providerId as { _id?: unknown; name?: string } | null;
    const data = {
      id: session._id.toString(),
      name: session.name,
      providerId: provider?._id != null ? String(provider._id) : session.providerId?.toString(),
      providerName: provider?.name ?? "",
      date: session.date,
      time: session.time,
      durationMinutes: session.durationMinutes,
      format: session.format,
      description: session.description,
      availability: session.availability,
      language: session.language,
      enrolledCount: session.enrolledCount,
      maxParticipants: session.maxParticipants,
      meetingUrl: session.meetingUrl ?? undefined,
    };
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const updateSession = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const sessionId = typeof id === "string" ? id : Array.isArray(id) ? id[0] ?? "" : "";
    if (!sessionId) {
      return res.status(400).json({ success: false, error: "Invalid session ID" });
    }
    const session = await Session.findByIdAndUpdate(
      sessionId,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!session) {
      return res.status(404).json({ success: false, error: "Session not found" });
    }
    const populated = await session.populate("providerId");
    const provider = populated.providerId as { _id?: unknown; name?: string } | null;
    const data = {
      id: populated._id.toString(),
      name: populated.name,
      providerId: provider?._id != null ? String(provider._id) : populated.providerId?.toString(),
      providerName: provider?.name ?? "",
      date: populated.date,
      time: populated.time,
      durationMinutes: populated.durationMinutes,
      format: populated.format,
      description: populated.description,
      availability: populated.availability,
      language: populated.language,
      enrolledCount: populated.enrolledCount,
      maxParticipants: populated.maxParticipants,
      meetingUrl: populated.meetingUrl ?? undefined,
    };
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};