import User from "../models/User.js";

export const getUserStats = async (req, res) => {
  try {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );

    const stats = await User.aggregate([
      {
        $facet: {
          totalFarmers: [{ $match: { role: "farmer" } }, { $count: "count" }],
          totalBuyers: [{ $match: { role: "buyer" } }, { $count: "count" }],
          newFarmersThisMonth: [
            { $match: { role: "farmer", createdAt: { $gte: startOfMonth } } },
            { $count: "count" },
          ],
          newBuyersThisMonth: [
            { $match: { role: "buyer", createdAt: { $gte: startOfMonth } } },
            { $count: "count" },
          ],
          pendingVerification: [
            { $match: { verificationStatus: "pending" } },
            { $count: "count" },
          ],
          suspendedUsers: [
            { $match: { status: "suspended" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    // Format counts to avoid empty array issues
    const formatCount = (arr) => (arr.length ? arr[0].count : 0);

    res.status(200).json({
      status: "success",
      data: {
        totalFarmers: formatCount(stats[0].totalFarmers),
        totalBuyers: formatCount(stats[0].totalBuyers),
        newFarmersThisMonth: formatCount(stats[0].newFarmersThisMonth),
        newBuyersThisMonth: formatCount(stats[0].newBuyersThisMonth),
        pendingVerification: formatCount(stats[0].pendingVerification),
        suspendedUsers: formatCount(stats[0].suspendedUsers),
      },
    });
  } catch (err) {
    console.error("❌ getUserStats error:", err);
    res.status(500).json({ status: "error", message: err.message });
  }
};
