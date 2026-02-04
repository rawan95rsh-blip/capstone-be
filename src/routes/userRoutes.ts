import { Router } from "express";
import { createUser, getMe } from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", createUser);
router.get("/me", authenticate, getMe);

export default router;