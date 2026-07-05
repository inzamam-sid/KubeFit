import { Parser } from "json2csv";
import csv from "csv-parser";
import stream from "stream";
import Member from "../models/member.model.js";
import { memberSchema } from "../utils/validation.js";
import Subscription from "../models/subscription.model.js";

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
// export const getAllMembers = async (req, res) => {
//   try {
//     const members = await Member.find().sort({ createdAt: -1 });

//     res.status(200).json({
//       count: members.length,
//       members,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const getAllMembers = async (req, res) => {
  try {
    const { search, page = 1, limit = 10 } = req.query;

    //let query = {};
    let query = {
      isActive: true,
    };

    if (search) {
      query = {
        isActive: true,
        $or: [
          { name: { $regex: search, $options: "i" } },
          { memberId: { $regex: search, $options: "i" } },
          { mobile: { $regex: search, $options: "i" } },
        ],
      };
    }

    const skip = (page - 1) * limit;

    const members = await Member.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Member.countDocuments(query);

    res.json({
      members,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching members" });
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
// export const deleteMember = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const member = await Member.findById(id);

//     if (!member) {
//       return res.status(404).json({ message: "Member not found" });
//     }

//     const today = new Date();

//     console.log("Deleting Member:", id);

// // const subscriptions = await Subscription.find({ memberId: id });

// // console.log("Subscriptions found:", subscriptions);

// // Check if member has any currently valid subscription
// // const activeSubscription = await Subscription.findOne({
// //   memberId: id,
// //   status: { $in: ["active", "hold"] },
// //   endDate: { $gte: today },
// // });

// console.log("Member found:", member);

// const subscriptions = await Subscription.find({
//   memberId: member._id,
// });

// console.log("Subscriptions:", subscriptions);

// const activeSubscription = await Subscription.findOne({
//   memberId: member._id,
//   status: { $in: ["active", "hold"] },
// });

// console.log("Active subscription:", activeSubscription);

// if (activeSubscription) {
//   return res.status(400).json({
//     message:
//       "Cannot archive member. The member has an active subscription.",
//   });
// }

//     member.isActive = false;
//     await member.save();

//     res.status(200).json({
//       message: "Member archived successfully",
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const deleteMember = async (req, res) => {
//   try {
//     const { id } = req.params;

//     console.log("Deleting member:", id);

//     const member = await Member.findById(id);

//     if (!member) {
//       return res.status(404).json({ message: "Member not found" });
//     }

//     const activeSubscription = await Subscription.findOne({
//       memberId: id,
//       status: { $in: ["active", "hold"] },
//       endDate: { $gte: new Date() },
//     });

//     console.log("Subscription found:", activeSubscription);

//     if (activeSubscription) {
//       return res.status(400).json({
//         message: "Cannot archive member. Active subscription exists.",
//       });
//     }

//     member.isActive = false;
//     await member.save();

//     res.json({
//       message: "Member archived successfully",
//     });

//   } catch (err) {
//     console.log(err);
//   }
// };
export const deleteMember = async (req, res) => {
  return res.status(500).json({
    message: "THIS IS NEW CODE",
  });
};

// SEARCH MEMBERS
export const getMembers = async (req, res) => {
  try {
    const { search } = req.query;

    //let query = {};
    let query = {
      isActive: true,
    };

    if (search) {
      query = {
         isActive: true,
        $or: [
          { name: { $regex: search, $options: "i" } },
          { memberId: { $regex: search, $options: "i" } },
          { mobile: { $regex: search, $options: "i" } },
        ],
      };
    }

    const members = await Member.find(query).sort({ createdAt: -1 });

    res.json({ members });
  } catch (err) {
    res.status(500).json({ message: "Error fetching members" });
  }
};


// EXPORT MEMBERS AS CSV
export const exportMembersCSV = async (req, res) => {
  try {
    //const members = await Member.find();
    const members = await Member.find({
      isActive: true,
    });

    let csv =
      "name,memberId,mobile\n";

    members.forEach((member) => {
      csv += `${member.name},${member.memberId},${member.mobile}\n`;
    });

    res.header("Content-Type", "text/csv");

    res.attachment("members.csv");

    return res.send(csv);

  } catch (error) {
    res.status(500).json({
      message: "Error exporting CSV",
    });
  }
};


// IMPORT MEMBERS FROM CSV
export const importMembersCSV = async (req, res) => {
  try {
    const results = [];

    const bufferStream = new stream.PassThrough();

    bufferStream.end(req.file.buffer);

    bufferStream
      .pipe(csv())
      .on("data", (data) => {
        results.push(data);
      })
      .on("end", async () => {

        let inserted = 0;

        for (const item of results) {

          const existing = await Member.findOne({
            memberId: item.memberId,
          });

          // Skip duplicates
          if (existing) continue;

          await Member.create({
            name: item.name,
            memberId: item.memberId,
            mobile: item.mobile,
          });

          inserted++;
        }

        res.status(200).json({
          message: `${inserted} members imported successfully`,
        });
      });

  } catch (error) {
    res.status(500).json({
      message: "CSV import failed",
    });
  }
};

// DOWNLOAD SAMPLE CSV
export const downloadSampleCSV = async (req, res) => {
  try {
    const sampleData = [
      {
        name: "Ali Khan",
        memberId: "M001",
        mobile: "9876543210",
      },
      {
        name: "Ahmed",
        memberId: "M002",
        mobile: "9999999999",
      },
    ];

    const fields = ["name", "memberId", "mobile"];

    const json2csv = new Parser({ fields });

    const csv = json2csv.parse(sampleData);

    res.header("Content-Type", "text/csv");

    res.attachment("sample-members.csv");

    return res.send(csv);

  } catch (error) {
    res.status(500).json({
      message: "Sample CSV download failed",
    });
  }
};