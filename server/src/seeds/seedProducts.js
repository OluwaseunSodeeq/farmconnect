import dotenv from "dotenv";
import mongoose from "mongoose";

import Product from "../models/Product.js";
import Category from "../models/Category.js";
import User from "../models/User.js";
import Farm from "../models/Farm.js";

import products from "./data/products.js"; // your raw JSON array

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

const seedProducts = async () => {
  try {
    await mongoose.connect(DB, { tls: true });
    console.log("DB connected");

    // 1️⃣ Build lookup tables
    const categories = await Category.find();
    const farmers = await User.find({ role: "farmer" });
    const farms = await Farm.find();

    const categoryMap = {};
    categories.forEach((c) => (categoryMap[c.name] = c._id));

    const farmerMap = {};
    farmers.forEach((f) => (farmerMap[f.legacyId] = f._id));

    const farmMap = {};
    farms.forEach((f) => (farmMap[f.legacyId] = f._id));

    // 2️⃣ Transform products
    const formattedProducts = products.map((p) => ({
      name: p.name,
      category: categoryMap[p.category],
      farmer: farmerMap[p.farmerId],
      farm: farmMap[p.farmId],
      price: p.price,
      unit: p.unit,
      stock: p.stock,
      status: p.status,
      views: p.views,
      sales: p.sales,
      createdAt: p.createdAt,
    }));

    await Product.deleteMany();
    await Product.insertMany(formattedProducts);

    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedProducts();

// // seeds/seedProducts.js
// import connectDB from "../config/db.js";
// import { Product } from "../models/Product.js";
// import { Category } from "../models/Category.js";
// import { User } from "../models/User.js";
// import { Farm } from "../models/Farm.js";

// const seedProducts = async () => {
//   await connectDB();

//   const farmer = await User.findOne({ role: "farmer" });
//   const farm = await Farm.findOne({ farmer: farmer._id });
//   const category = await Category.findOne({ name: "Grains" });

//   if (!farmer || !farm || !category) {
//     console.log("❌ Missing required data");
//     process.exit(1);
//   }

//   await Product.create({
//     name: "Organic Maize",
//     category: category._id,
//     farmer: farmer._id,
//     farm: farm._id,
//     price: 2500,
//     unit: "kg",
//     stock: 500,
//     status: "approved",
//   });

//   console.log("✅ Product seeded");
//   process.exit();
// };

// seedProducts();
