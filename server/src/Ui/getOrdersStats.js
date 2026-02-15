import Order from "../models/Order.js";

export const getOrderStats = async (req, res) => {
  try {
    const startOfMonth = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1,
    );

    const stats = await Order.aggregate([
      {
        $facet: {
          // Total orders & new this month
          totalOrders: [{ $count: "count" }],
          newOrdersThisMonth: [
            { $match: { createdAt: { $gte: startOfMonth } } },
            { $count: "count" },
          ],

          // Orders by status
          inTransit: [
            { $match: { orderStatus: "in-transit" } },
            { $count: "count" },
          ],
          completed: [
            { $match: { orderStatus: "delivered" } },
            { $count: "count" },
          ],
          failedOrCancelled: [
            { $match: { orderStatus: { $in: ["cancelled", "failed"] } } },
            { $count: "count" },
          ],

          // Monthly revenue breakdown
          monthlyRevenue: [
            {
              $group: {
                _id: { $month: "$createdAt" },
                revenue: { $sum: "$totalAmount" },
                orders: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ],

          // Platform earning / commission (example: 5% per order)
          platformEarnings: [
            {
              $group: {
                _id: null,
                earnings: { $sum: { $multiply: ["$totalAmount", 0.05] } },
              },
            },
          ],
        },
      },
    ]);

    const result = stats[0];

    res.status(200).json({
      status: "success",
      data: {
        totalOrders: result.totalOrders[0]?.count ?? 0,
        newOrdersThisMonth: result.newOrdersThisMonth[0]?.count ?? 0,
        inTransit: result.inTransit[0]?.count ?? 0,
        completed: result.completed[0]?.count ?? 0,
        failedOrCancelled: result.failedOrCancelled[0]?.count ?? 0,
        monthlyRevenue: result.monthlyRevenue.map((m) => ({
          month: m._id,
          revenue: m.revenue,
          orders: m.orders,
        })),
        platformEarnings: result.platformEarnings[0]?.earnings ?? 0,
      },
    });
  } catch (err) {
    console.error("❌ getOrderStats failed:", err.message);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// import Order from "../models/Order.js";

// export const getOrderStats = async (req, res) => {
//   try {
//     const startOfMonth = new Date(
//       new Date().getFullYear(),
//       new Date().getMonth(),
//       1
//     );

//     const stats = await Order.aggregate([
//       {
//         $facet: {
//           totalOrders: [{ $count: "count" }],
//           newOrdersThisMonth: [
//             { $match: { createdAt: { $gte: startOfMonth } } },
//             { $count: "count" },
//           ],
//           inTransit: [
//             { $match: { orderStatus: "in-transit" } },
//             { $count: "count" },
//           ],
//           completed: [
//             { $match: { orderStatus: "delivered" } },
//             { $count: "count" },
//           ],
//           failedOrCancelled: [
//             { $match: { orderStatus: "cancelled" } },
//             { $count: "count" },
//           ],
//           monthlyRevenue: [
//             {
//               $match: { paymentStatus: "paid", createdAt: { $gte: startOfMonth } },
//             },
//             {
//               $group: {
//                 _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
//                 totalRevenue: { $sum: "$totalAmount" },
//                 totalOrders: { $sum: 1 },
//                 platformEarnings: { $sum: { $multiply: ["$totalAmount", 0.05] } }, // 5% commission example
//               },
//             },
//           ],
//         },
//       },
//     ]);

//     // Helper to safely get counts
//     const formatCount = (arr) => (arr.length ? arr[0].count : 0);

//     res.status(200).json({
//       status: "success",
//       data: {
//         totalOrders: formatCount(stats[0].totalOrders),
//         newOrdersThisMonth: formatCount(stats[0].newOrdersThisMonth),
//         inTransit: formatCount(stats[0].inTransit),
//         completed: formatCount(stats[0].completed),
//         failedOrCancelled: formatCount(stats[0].failedOrCancelled),
//         monthlyRevenue: stats[0].monthlyRevenue.length
//           ? stats[0].monthlyRevenue[0]
//           : { totalRevenue: 0, totalOrders: 0, platformEarnings: 0 },
//       },
//     });
//   } catch (err) {
//     console.error("❌ getOrderStats error:", err);
//     res.status(500).json({ status: "error", message: err.message });
//   }
// };
