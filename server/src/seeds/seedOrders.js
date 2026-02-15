import Order from "../models/Order.js";
import User from "../models/User.js";
import Farm from "../models/Farm.js";
import Product from "../models/Product.js";
import { orders } from "./data.js";

const seedOrders = async () => {
  try {
    // Fetch all existing users, farms, and products
    const users = await User.find();
    const farms = await Farm.find();
    const products = await Product.find();

    // ===== MAPS =====
    const userMap = {};
    users.forEach((u) => (userMap[u.legacyId] = u._id));

    const farmMap = {};
    farms.forEach((f) => (farmMap[f.legacyId] = f._id));

    const productMap = {};
    products.forEach((p) => (productMap[p.legacyId] = p));

    // ===== FORMAT ORDERS =====
    const formattedOrders = orders.map((order) => {
      if (!userMap[order.buyerId]) {
        throw new Error(`Buyer not found: ${order.buyerId}`);
      }
      if (!userMap[order.farmerId]) {
        throw new Error(`Farmer not found: ${order.farmerId}`);
      }
      if (!farmMap[order.farmId]) {
        throw new Error(`Farm not found: ${order.farmId}`);
      }

      const items = order.items.map((i) => {
        const product = productMap[i.productId];
        if (!product) {
          throw new Error(`Product not found: ${i.productId}`);
        }

        const total = i.quantity * i.price;

        return {
          product: product._id,
          name: product.name, // snapshot for frontend
          unit: product.unit,
          quantity: i.quantity,
          price: i.price,
          total,
        };
      });

      // Sum total for the order
      const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

      return {
        legacyId: order.legacyId,
        buyer: userMap[order.buyerId],
        farmer: userMap[order.farmerId],
        farm: farmMap[order.farmId],
        items,
        totalAmount,
        currency: order.currency ?? "UGX",
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        createdAt: new Date(order.createdAt),
      };
    });

    // Insert all orders
    await Order.insertMany(formattedOrders);
    console.log("✅ Orders seeded successfully");
  } catch (err) {
    console.error("❌ Seeding Orders failed:", err.message);
    throw err;
  }
};

export default seedOrders;

// import Order from "../models/Order.js";
// import User from "../models/User.js";
// import Farm from "../models/Farm.js";
// import Product from "../models/Product.js";
// import { orders } from "./data.js";

// const seedOrders = async () => {
//   const users = await User.find();
//   const farms = await Farm.find();
//   const products = await Product.find();

//   // ===== MAPS =====
//   const userMap = {};
//   users.forEach((u) => {
//     userMap[u.legacyId] = u._id;
//   });

//   const farmMap = {};
//   farms.forEach((f) => {
//     farmMap[f.legacyId] = f._id;
//   });

//   const productMap = {};
//   products.forEach((p) => {
//     productMap[p.legacyId] = p;
//   });

//   // ===== FORMAT ORDERS =====
//   const formattedOrders = orders.map((order) => {
//     if (!userMap[order.buyerId]) {
//       throw new Error(`Buyer not found: ${order.buyerId}`);
//     }

//     if (!userMap[order.farmerId]) {
//       throw new Error(`Farmer not found: ${order.farmerId}`);
//     }

//     if (!farmMap[order.farmId]) {
//       throw new Error(`Farm not found: ${order.farmId}`);
//     }

//     const items = order.items.map((i) => {
//       const product = productMap[i.productId];

//       if (!product) {
//         throw new Error(`Product not found: ${i.productId}`);
//       }

//       const total = i.quantity * i.price;

//       return {
//         product: product._id,
//         name: product.name,
//         unit: product.unit,
//         quantity: i.quantity,
//         price: i.price,
//         total,
//       };
//     });

//     const totalAmount = items.reduce((sum, item) => sum + item.total, 0);

//     return {
//       legacyId: order.legacyId,
//       buyer: userMap[order.buyerId],
//       farmer: userMap[order.farmerId],
//       farm: farmMap[order.farmId],
//       items,
//       totalAmount,
//       currency: order.currency ?? "UGX",
//       paymentStatus: order.paymentStatus,
//       orderStatus: order.orderStatus,
//       createdAt: new Date(order.createdAt),
//     };
//   });

//   await Order.insertMany(formattedOrders);
//   console.log("✅ Orders seeded successfully");
// };

// export default seedOrders;
