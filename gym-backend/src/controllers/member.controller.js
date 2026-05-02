import Member from "../models/member.model.js";
import { memberSchema } from "../utils/validation.js";

export const addMember = async (req, res) => {
  try {

    const { error } = memberSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { name, memberId, mobile } = req.body;

    // Basic validation
    if (!name || !memberId || !mobile) {
      return res.status(400).json({ message: "All fields are required" });
    }

     

    // Check duplicate memberId
    const existing = await Member.findOne({ memberId });
    if (existing) {
      return res.status(400).json({ message: "Member ID already exists" });
    }

    const member = await Member.create({
      name,
      memberId,
      mobile,
    });

    res.status(201).json({
      message: "Member added successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET ALL MEMBERS
export const getAllMembers = async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: members.length,
      members,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// GET SINGLE MEMBER BY ID (Mongo _id)
export const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE MEMBER
export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, mobile } = req.body;

    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Update fields (only if provided)
    if (name) member.name = name;
    if (mobile) member.mobile = mobile;

    await member.save();

    res.status(200).json({
      message: "Member updated successfully",
      member,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


// DELETE MEMBER
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;

    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    await Member.findByIdAndDelete(id);

    res.status(200).json({
      message: "Member deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};