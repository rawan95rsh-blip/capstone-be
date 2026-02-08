import { Router } from "express";
import { createSession, getSessions, getSessionById, updateSession } from "../controllers/sessionController";

const router = Router();

router.post("/", createSession);
router.get("/", getSessions);
router.get("/:id", getSessionById);
router.patch("/:id", updateSession);

export default router;