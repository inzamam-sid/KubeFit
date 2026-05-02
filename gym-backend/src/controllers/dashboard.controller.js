import Member from "../models/member.model.js";
import Subscription from "../models/subscription.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // 1. Total Members
    const totalMembers = await Member.countDocuments();

    // 2. Active Members
    const activeMembers = await Subscription.countDocuments({
      status: { $ne: "hold" },
      endDate: { $gte: today },
    });

    // 3. Expiring Today
    const expiringToday = await Subscription.countDocuments({
      status: { $ne: "hold" },
      endDate: { $gte: today, $lt: tomorrow },
    });

    // 4. Overdue Members
    const overdueMembers = await Subscription.countDocuments({
      endDate: { $lt: today },
    });

    // HOLD MEMBERS
        const holdMembers = await Subscription.countDocuments({
        status: "hold",
        });

    // 5. Monthly Revenue
    const monthlyRevenueAgg = await Subscription.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$finalPrice" },
        },
      },
    ]);

    const monthlyRevenue =
      monthlyRevenueAgg.length > 0 ? monthlyRevenueAgg[0].total : 0;

    res.status(200).json({
      totalMembers,
      activeMembers,
      expiringToday,
      overdueMembers,
      holdMembers,
      monthlyRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};