import mongoose from "mongoose";
import dotenv from "dotenv";

import seedUsers from "./seedUsers.js";
import seedCategories from "./seedCategories.js";
import seedFarms from "./seedFarms.js";
import seedProducts from "./seedProducts.js";
import seedOrders from "./seedOrders.js";

import User from "../models/User.js";
import Farm from "../models/Farm.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

const seedAll = async () => {
  try {
    await mongoose.connect(DB);
    console.log("✅ DB connected");

    // WIPE (children → parents)
    await User.deleteMany();
    await Farm.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    // SEED (parents → children)
    await seedUsers();
    await seedCategories();
    await seedFarms();
    await seedProducts();
    await seedOrders();

    console.log("🎉 ALL DATA SEEDED SUCCESSFULLY");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
};

seedAll();

// =======
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// // MODELS
// import User from "../models/User.js";
// import Farm from "../models/Farm.js";
// import Product from "../models/Product.js";

// // SEED FUNCTIONS
// import seedUsers from "./seedUsers.js";
// import seedFarms from "./seedFarms.js";
// import seedProducts from "./seedProducts.js";

// dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD,
// );

// const seedAll = async () => {
//   try {
//     await mongoose.connect(DB);
//     console.log("✅ DB connected");

//     console.log("🧹 Clearing collections...");
//     await Product.deleteMany();
//     await Farm.deleteMany();
//     await User.deleteMany();

//     console.log("👤 Seeding users...");
//     await seedUsers();

//     console.log("🚜 Seeding farms...");
//     await seedFarms();

//     console.log("📦 Seeding products...");
//     await seedProducts();

//     console.log("🎉 ALL DATA SEEDED SUCCESSFULLY");
//     process.exit();
//   } catch (err) {
//     console.error("❌ Seed failed:", err.message);
//     process.exit(1);
//   }
// };

// seedAll();
