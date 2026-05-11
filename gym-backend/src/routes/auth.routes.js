import express from "express";
import rateLimit from "express-rate-limit";
import { registerAdmin, loginAdmin, refreshAccessToken, logoutAdmin, changePassword,} from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // only 5 attempts
  message: "Too many login attempts. Try later.",
});

router.post("/register", registerAdmin); // use once
router.post("/login", loginLimiter, loginAdmin);

// 🔥 NEW
router.post("/refresh", refreshAccessToken);
router.post(
  "/refresh-token",
  refreshAccessToken
);
router.post("/logout", verifyToken, logoutAdmin);
router.put(
  "/change-password",
  verifyToken,
  changePassword
);


export default router;

