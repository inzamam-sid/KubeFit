import express from "express";
import {
  addMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../controllers/member.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/", verifyToken, addMember);
router.get("/", verifyToken, getAllMembers);
router.get("/:id", verifyToken, getMemberById);

// NEW ROUTES
router.put("/:id", verifyToken, updateMember);
router.delete("/:id", verifyToken, deleteMember);

export default router;