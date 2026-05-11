import express from "express";
import {
  addSubscription,
  holdSubscription,
  resumeSubscription,
  getHoldSubscriptions,
  getAllSubscriptions,
  getExpiringToday,
  getOverdueSubscriptions,
  getLatestSubscription,
  exportSubscriptionsCSV,
} from "../controllers/subscription.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", verifyToken, addSubscription);

// 🔥 NEW ROUTES
router.post("/:id/hold", verifyToken, holdSubscription);
router.post("/:id/resume", verifyToken, resumeSubscription);
router.get("/hold", verifyToken, getHoldSubscriptions);
router.get("/", verifyToken, getAllSubscriptions);
router.get("/expiring-today", verifyToken, getExpiringToday);
router.get("/overdue", verifyToken, getOverdueSubscriptions);
router.get(
  "/member/:memberId/latest",
  verifyToken,
  getLatestSubscription
);
router.get(
  "/export/csv",
  verifyToken,
  exportSubscriptionsCSV
);

export default router;