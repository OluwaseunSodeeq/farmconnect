export const getProductStats = async (req, res) => {
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  );

  const stats = await Product.aggregate([
    {
      $facet: {
        totalProducts: [{ $count: "count" }],

        newThisMonth: [
          { $match: { createdAt: { $gte: startOfMonth } } },
          { $count: "count" },
        ],

        pendingApproval: [
          { $match: { status: "pending" } },
          { $count: "count" },
        ],

        activeListings: [
          {
            $match: {
              status: "approved",
              stock: { $gt: 0 },
            },
          },
          { $count: "count" },
        ],

        outOfStock: [{ $match: { stock: { $lte: 0 } } }, { $count: "count" }],
      },
    },
  ]);

  const formatCount = (arr) => (arr.length ? arr[0].count : 0);

  res.status(200).json({
    status: "success",
    data: {
      totalProducts: formatCount(stats[0].totalProducts),
      newThisMonth: formatCount(stats[0].newThisMonth),
      pendingApproval: formatCount(stats[0].pendingApproval),
      activeListings: formatCount(stats[0].activeListings),
      outOfStock: formatCount(stats[0].outOfStock),
    },
  });
};

// export const getProductStats = async (req, res) => {
//   const stats = await Product.aggregate([
//     {
//       $facet: {
//         totalProducts: [{ $count: "count" }],
//         outOfStock: [{ $match: { stock: { $lte: 0 } } }, { $count: "count" }],
//         lowStock: [{ $match: { stock: { $lte: 10 } } }, { $count: "count" }],
//       },
//     },
//   ]);

//   res.status(200).json({
//     status: "success",
//     data: stats[0],
//   });
// };
