import Package from "../models/package.model.js";

// ADD PACKAGE
export const addPackage = async (req, res) => {
  try {
    const { name, duration, price } = req.body;

    if (!name || !duration || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const pkg = await Package.create({
      name,
      duration,
      price,
    });

    res.status(201).json({
      message: "Package created successfully",
      package: pkg,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET ACTIVE PACKAGES ONLY
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      count: packages.length,
      packages,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// DISABLE PACKAGE
export const disablePackage = async (req, res) => {
  try {
    const { id } = req.params;

    const pkg = await Package.findById(id);

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    pkg.isActive = false;
    await pkg.save();

    res.status(200).json({
      message: "Package disabled successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};