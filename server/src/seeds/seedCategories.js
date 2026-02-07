import dotenv from "dotenv";
import Category from "../models/Category.js";

dotenv.config({ path: "./config.env" });

const seedCategories = async () => {
  try {
    await Category.deleteMany();

    await Category.insertMany([
      { name: "Grains" },
      { name: "Legumes" },
      { name: "Vegetables" },
      { name: "Fruits" },
      { name: "Tubers" },
      { name: "Cash Crops" },
      { name: "By-products" },
    ]);

    console.log("✅ Categories seeded successfully");
  } catch (err) {
    console.error("❌ Failed to seed categories:", err.message);
    throw err;
  }
};

export default seedCategories;

// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import Category from "../models/Category.js";

// dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD,
// );

// const seedCategories = async () => {
//   try {
//     await mongoose.connect(DB);
//     console.log("Connected to DB:", mongoose.connection.name);
//     await Category.deleteMany();

//     await Category.insertMany([
//       { name: "Grains" },
//       { name: "Legumes" },
//       { name: "Vegetables" },
//       { name: "Fruits" },
//       { name: "Tubers" },
//       { name: "Cash Crops" },
//       { name: "By-products" },
//     ]);

//     console.log("✅ Categories seeded successfully");
//     process.exit();
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// export default seedCategories();

// import connectDB from "../config/db.js";
// import Category from "../models/Category.js";

// const seedCategories = async () => {
//   await connectDB();
//   await Category.deleteMany();
//   await Category.insertMany([
//     { name: "Grains" },
//     { name: "Legumes" },
//     { name: "Vegetables" },
//     { name: "Fruits" },
//     { name: "Tubers" },
//     { name: "Cash Crops" },
//     { name: "By-products" },
//   ]);
//   console.log("Categories seeded successfully.");
//   process.exit();
// };

// seedCategories();
