import express from "express";
import {
  addPackage,
  getAllPackages,
  disablePackage,
} from "../controllers/package.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, addPackage);
router.get("/", verifyToken, getAllPackages);

// 🔥 NEW ROUTE
router.put("/:id/disable", verifyToken, disablePackage);

export default router;