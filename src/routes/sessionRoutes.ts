import { Router } from "express";
import { createSession, getSessions, getSessionById } from "../controllers/sessionController";

const router = Router();

router.post("/", createSession);
router.get("/", getSessions);
router.get("/:id", getSessionById);

export default router;