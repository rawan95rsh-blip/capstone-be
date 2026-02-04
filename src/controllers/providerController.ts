import { Request, Response } from "express";
import Provider from "../models/Provider";

export const getProviders = async (req: Request, res: Response) => {
  try {
    const providers = await Provider.find().sort({ name: 1 });
    const data = providers.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      age: p.age,
      gender: p.gender,
      degree: p.degree,
      degreeAr: p.degreeAr,
      specialization: p.specialization,
      specializationAr: p.specializationAr,
      volunteerCoHost: p.volunteerCoHost,
      bio: p.bio,
      bioAr: p.bioAr,
      sessionIds: (p.sessionIds || []).map((id) => id.toString()),
    }));
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getProviderById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const providerId = typeof id === "string" ? id : Array.isArray(id) ? id[0] ?? "" : "";
    if (!providerId) {
      return res.status(400).json({ success: false, error: "Invalid provider ID" });
    }
    const provider = await Provider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ success: false, error: "Provider not found" });
    }
    const data = {
      id: provider._id.toString(),
      name: provider.name,
      age: provider.age,
      gender: provider.gender,
      degree: provider.degree,
      degreeAr: provider.degreeAr,
      specialization: provider.specialization,
      specializationAr: provider.specializationAr,
      volunteerCoHost: provider.volunteerCoHost,
      bio: provider.bio,
      bioAr: provider.bioAr,
      sessionIds: (provider.sessionIds || []).map((id) => id.toString()),
    };
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const createProvider = async (req: Request, res: Response) => {
  try {
    const newProvider = await Provider.create(req.body);
    return res.status(201).json({ success: true, data: newProvider });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
};