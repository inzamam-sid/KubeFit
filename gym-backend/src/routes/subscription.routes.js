import express from "express";
import {
  addSubscription,
  holdSubscription,
  resumeSubscription,
  getHoldSubscriptions,
} from "../controllers/subscription.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, addSubscription);

// 🔥 NEW ROUTES
router.post("/:id/hold", verifyToken, holdSubscription);
router.post("/:id/resume", verifyToken, resumeSubscription);
router.get("/hold", verifyToken, getHoldSubscriptions);

export default router;