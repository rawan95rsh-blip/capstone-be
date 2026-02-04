import { Router } from "express";
import {
  createUser,
  getMe,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/userController";
import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.post("/", createUser);
router.get("/me", authenticate, getMe);
router.get("/", authenticate, getAllUsers);
router.get("/:id", authenticate, getUserById);
router.patch("/:id", authenticate, updateUserById);
router.delete("/:id", authenticate, deleteUserById);

export default router;