import { Router } from "express";
import { getProviders, getProviderById, createProvider } from "../controllers/providerController";

const router = Router();

router.get("/", getProviders);
router.get("/:id", getProviderById);
router.post("/", createProvider);

export default router;