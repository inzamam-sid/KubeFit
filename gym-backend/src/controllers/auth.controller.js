import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// REGISTER ADMIN (run once manually)
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Admin created",
      admin,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// LOGIN ADMIN
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // 🔥 Access Token (short)
    const accessToken = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // 🔥 Refresh Token (long)
    const refreshToken = jwt.sign(
      { id: admin._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Save refresh token
    admin.refreshToken = refreshToken;
    await admin.save();

    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const admin = await Admin.findById(decoded.id);

    if (!admin || admin.refreshToken !== refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(403).json({ message: "Token expired or invalid" });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    const adminId = req.user.id;

    const admin = await Admin.findById(adminId);

    admin.refreshToken = null;
    await admin.save();

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};