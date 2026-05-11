import cron from "node-cron";
import Subscription from "../models/subscription.model.js";

// ⏰ Runs every day at 12:00 AM
cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Running subscription maintenance...");

  try {
    const today = new Date();

    // ===================================================
    // 1. AUTO EXPIRE SUBSCRIPTIONS
    // ===================================================

    const expiredResult = await Subscription.updateMany(
      {
        endDate: { $lt: today },
        status: "active",
      },
      {
        $set: { status: "expired" },
      }
    );

    console.log(
      `✅ Expired updated: ${expiredResult.modifiedCount}`
    );

    // ===================================================
    // 2. AUTO RESUME HOLD SUBSCRIPTIONS
    // ===================================================

    const holdSubscriptions = await Subscription.find({
      status: "hold",
      autoResumeDate: { $lte: today },
    });

    for (const subscription of holdSubscriptions) {

      const holdStart = new Date(
        subscription.holdStartDate
      );

      const holdDays = Math.ceil(
        (today - holdStart) /
          (1000 * 60 * 60 * 24)
      );

      // Extend end date
      subscription.endDate.setDate(
        subscription.endDate.getDate() + holdDays
      );

      // Update hold days
      //subscription.totalHoldDays += holdDays;
      subscription.totalHoldDays = 0;

      // Resume subscription
      subscription.status = "active";

      // Clear hold fields
      subscription.holdStartDate = null;

      subscription.autoResumeDate = null;

      await subscription.save();

      console.log(
        `✅ Auto resumed: ${subscription._id}`
      );
    }

  } catch (error) {
    console.error("❌ Cron error:", error);
  }
});