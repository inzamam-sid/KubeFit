import Subscription from "../models/subscription.model.js";
import Member from "../models/member.model.js";
import Package from "../models/package.model.js";

// export const addSubscription = async (req, res) => {
//   try {
//     const { memberId, packageId, finalPrice } = req.body;

//     // 1. Validate member
//     const member = await Member.findById(memberId);
//     if (!member) {
//       return res.status(404).json({ message: "Member not found" });
//     }

//     // 2. Validate package
//     const pkg = await Package.findById(packageId);
//     if (!pkg || !pkg.isActive) {
//       return res.status(404).json({ message: "Package not found or inactive" });
//     }

//     const today = new Date();

//     // 3. Check existing active subscription
//     const existing = await Subscription.findOne({
//       memberId,
//       status: "active",
//       endDate: { $gte: today },
//     });

//     let startDate;

//     if (existing) {
//       // 🔥 Extend from current subscription
//       startDate = new Date(existing.endDate);
//     } else {
//       // Fresh start
//       startDate = new Date();
//     }

//     // 4. Calculate endDate
//     const endDate = new Date(startDate);
//     endDate.setDate(endDate.getDate() + pkg.duration);

//     // 5. Pricing
//     const actualPrice = pkg.price;
//     const priceToStore = finalPrice || actualPrice;

//     const subscription = await Subscription.create({
//       memberId,
//       packageId,
//       startDate,
//       endDate,
//       actualPrice,
//       finalPrice: priceToStore,
//     });

//     res.status(201).json({
//       message: "Subscription created successfully",
//       subscription,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const addSubscription = async (req, res) => {
  try {
    const { memberId, packageId, finalPrice } = req.body;

    // Validate
    if (!memberId || !packageId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const member = await Member.findById(memberId);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const pkg = await Package.findById(packageId);
    if (!pkg || !pkg.isActive) {
      return res.status(404).json({ message: "Invalid package" });
    }

    const startDate = new Date();

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + (pkg.duration || 0));

    const actualPrice = pkg.price;
    const priceToStore =
      finalPrice && !isNaN(finalPrice)
        ? Number(finalPrice)
        : actualPrice;

    const subscription = await Subscription.create({
      memberId,
      packageId,
      startDate,
      endDate,
      actualPrice,
      finalPrice: priceToStore,
    });

    res.status(201).json({
      message: "Subscription created",
      subscription,
    });
  } catch (error) {
    console.error("Subscription Error:", error); // 🔥 ADD THIS
    res.status(500).json({ message: "Internal server error" });
  }
};


export const holdSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    if (subscription.status !== "active") {
      return res.status(400).json({ message: "Only active subscription can be held" });
    }

    subscription.status = "hold";
    subscription.holdStartDate = new Date();

    await subscription.save();

    res.status(200).json({
      message: "Subscription put on hold",
      subscription,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const resumeSubscription = async (req, res) => {
  try {
    const { id } = req.params;

    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }

    if (subscription.status !== "hold") {
      return res.status(400).json({ message: "Subscription is not on hold" });
    }

    const today = new Date();

    // Calculate hold days
    const holdStart = new Date(subscription.holdStartDate);
    const holdDays = Math.ceil(
      (today - holdStart) / (1000 * 60 * 60 * 24)
    );

    // Extend endDate
    subscription.endDate.setDate(subscription.endDate.getDate() + holdDays);

    // Update fields
    subscription.totalHoldDays += holdDays;
    subscription.status = "active";
    subscription.holdStartDate = null;

    await subscription.save();

    res.status(200).json({
      message: "Subscription resumed successfully",
      holdDays,
      subscription,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getHoldSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ status: "hold" })
      .populate("memberId", "name mobile memberId")
      .sort({ holdStartDate: -1 });

    res.status(200).json({
      count: subscriptions.length,
      subscriptions,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("memberId", "name memberId")
      .populate("packageId", "name");

    res.status(200).json({
      count: subscriptions.length,
      subscriptions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getExpiringToday = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const subscriptions = await Subscription.find({
      endDate: { $gte: start, $lte: end },
      status: "active",
    })
      .populate("memberId", "name memberId mobile")
      .populate("packageId", "name");

    res.status(200).json({
      count: subscriptions.length,
      subscriptions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOverdueSubscriptions = async (req, res) => {
  try {
    const today = new Date();

    const subscriptions = await Subscription.find({
      endDate: { $lt: today },
      status: "active", // still active but expired → overdue
    })
      .populate("memberId", "name memberId mobile")
      .populate("packageId", "name");

    res.status(200).json({
      count: subscriptions.length,
      subscriptions,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

