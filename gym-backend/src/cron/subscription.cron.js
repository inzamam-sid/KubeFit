import cron from "node-cron";
import Subscription from "../models/subscription.model.js";

// ⏰ Runs every day at 12:00 AM
cron.schedule("0 0 * * *", async () => {
  console.log("🔄 Running expiry check...");

  try {
    const today = new Date();

    const result = await Subscription.updateMany(
      {
        endDate: { $lt: today },
        status: "active", // only active ones
      },
      {
        $set: { status: "expired" },
      }
    );

    console.log(`✅ Expired updated: ${result.modifiedCount}`);
  } catch (error) {
    console.error("❌ Cron error:", error);
  }
});