import express from "express";
import upload from "../middleware/upload.middleware.js";
import {
  addMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  importMembersCSV,
  exportMembersCSV,
  downloadSampleCSV,
} from "../controllers/member.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/", verifyToken, addMember);
router.get("/", verifyToken, getAllMembers);
router.get("/:id", verifyToken, getMemberById);

// NEW ROUTES
router.put("/:id", verifyToken, updateMember);
router.delete("/:id", verifyToken, deleteMember);

router.get(
  "/export/csv",
  exportMembersCSV
);

router.post(
  "/import/csv",
  verifyToken,
  upload.single("file"),
  importMembersCSV
);

router.get(
  "/sample/csv",
  
  downloadSampleCSV
);

export default router;