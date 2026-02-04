import { Router } from "express";
import { createGroup, getGroups, getGroupById, updateGroup, deleteGroup } from "../controllers/supportGroupController";
const router = Router();

router.post("/", createGroup);
router.get("/", getGroups);
router.get("/:id", getGroupById);


router.patch("/:id", updateGroup);
router.delete("/:id", deleteGroup);


export default router;