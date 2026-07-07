import Subscription from "../models/subscription.model.js";
import Member from "../models/member.model.js";
import Package from "../models/package.model.js";


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

    if (!member.isActive) {
  return res.status(400).json({
    message: "This member is archived. Restore the member before creating a subscription.",
  });
}

    const pkg = await Package.findById(packageId);
    if (!pkg || !pkg.isActive) {
      return res.status(404).json({ message: "Invalid package" });
    }

    // const startDate = new Date();

    // const endDate = new Date(startDate);
    // endDate.setDate(endDate.getDate() + (pkg.duration || 0));
    const today = new Date();

    const existingSubscription = await Subscription.findOne({
      memberId,
      status: "active",
      endDate: { $gte: today },
    }).sort({ endDate: -1 });

    let startDate;

    // ✅ Manual start date
    if (req.body.startDate) {
      startDate = new Date(req.body.startDate);

      // Prevent overlap
      if (
        existingSubscription &&
        startDate < existingSubscription.endDate
      ) {
        return res.status(400).json({
          message: `Member already active until ${existingSubscription.endDate.toDateString()}`,
        });
      }
    } else {
      // ✅ Smart auto renewal

      if (existingSubscription) {
        startDate = new Date(existingSubscription.endDate);
      } else {
        startDate = today;
      }
    }

    // Calculate end date
    const endDate = new Date(startDate);

    endDate.setDate(
      endDate.getDate() + pkg.duration
    );

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

    // subscription.status = "hold";
    // subscription.holdStartDate = new Date();
    const today = new Date();

    // Max hold limit
    if (subscription.totalHoldDays >= 30) {
      return res.status(400).json({
        message: "Maximum hold limit reached (30 days)",
      });
    }

    // Remaining hold days
    const remainingHoldDays =
      30 - subscription.totalHoldDays;

    // Auto resume date
    const autoResumeDate = new Date(today);

    autoResumeDate.setDate(
      autoResumeDate.getDate() + remainingHoldDays
    );

    subscription.status = "hold";

    subscription.holdStartDate = today;

    subscription.autoResumeDate = autoResumeDate;

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
    //subscription.endDate.setDate(subscription.endDate.getDate() + holdDays);
    const newEndDate = new Date(subscription.endDate);

    newEndDate.setDate(
      newEndDate.getDate() + holdDays
    );

    subscription.endDate = newEndDate;

    // Update fields
    subscription.totalHoldDays += holdDays;
    //subscription.totalHoldDays = 0;
    subscription.status = "active";
    subscription.holdStartDate = null;
    subscription.autoResumeDate = null;

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


// export const getAllSubscriptions = async (req, res) => {
//   try {
//     const subscriptions = await Subscription.find()
//       //.populate("memberId", "name memberId")
//        .populate("memberId", "name memberId isActive")
//       .populate("packageId", "name");

//     res.status(200).json({
//       count: subscriptions.length,
//       subscriptions,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

export const getAllSubscriptions = async (req, res) => {
  return res.json({
    test: "Hello from latest backend"
  });
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


export const getLatestSubscription = async (req, res) => { 
  try {
    const { memberId } = req.params; // /subscriptions/latest/:memberId

    const subscription = await Subscription.findOne({
      memberId,  
      status: "active",
    })
      .sort({ endDate: -1 })
      .populate("packageId", "name");

    if (!subscription) {
      return res.status(404).json({
        message: "No active subscription",
      });
    }

    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


export const exportSubscriptionsCSV = async (req, res) => {
  try {
    const subscriptions = await Subscription.find()
      .populate("memberId", "name memberId")
      .populate("packageId", "name")
      .sort({ createdAt: -1 });

    let csv =
      // "Member Name,Member ID,Package,Start Date,End Date,Status\n";
      "Member Name,Member ID,Package,Start Date,End Date,Final Price,Status\n";

    subscriptions.forEach((sub) => {
      csv += `${sub.memberId?.name || ""},`;
      csv += `${sub.memberId?.memberId || ""},`;
      csv += `${sub.packageId?.name || ""},`;
      csv += `${new Date(sub.startDate).toLocaleDateString()},`;
      csv += `${new Date(sub.endDate).toLocaleDateString()},`;
      csv += `${sub.finalPrice},`;
      csv += `${sub.status}\n`;
    });

    res.header("Content-Type", "text/csv");

    res.attachment("subscriptions.csv");

    return res.send(csv);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error exporting subscriptions",
    });
  }
};