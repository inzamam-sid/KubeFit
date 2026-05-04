

import express from "express";
import { 
  getDashboardStats,
  getRevenueChart   // 👈 ADD THIS
} from "../controllers/dashboard.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/stats", verifyToken, getDashboardStats);

// 🔥 ADD THIS ROUTE
router.get("/revenue-chart", verifyToken, getRevenueChart);

export default router;