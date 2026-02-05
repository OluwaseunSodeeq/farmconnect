import mongoose from "mongoose";
import Category from "../models/Category.js";
import User from "../models/User.js";
import Farm from "../models/Farm.js";
import { products } from "./data.js";
import Product from "../models/Product.js";

const seedProducts = async () => {
  try {
    // Get categories, farmers, farms
    const categories = await Category.find();
    const farmers = await User.find({ legacyId: { $exists: true } });
    const farms = await Farm.find();

    // Build lookup maps
    const categoryMap = {};
    categories.forEach((c) => {
      categoryMap[c.name.trim().toLowerCase()] = c._id;
    });

    const farmerMap = {};
    farmers.forEach((f) => {
      farmerMap[f.legacyId] = f._id;
    });

    const farmMap = {};
    const farmOwnerMap = {};
    farms.forEach((f) => {
      farmMap[f.legacyId] = f._id;
      farmOwnerMap[f.legacyId] = f.farmer.toString(); // for ownership check
    });

    // Transform products
    const formattedProducts = products.map((p) => {
      // Validate category
      const catId = categoryMap[p.category.trim().toLowerCase()];
      if (!catId) throw new Error(`Category not found: ${p.category}`);

      // Validate farmer
      const farmerId = farmerMap[p.farmerId];
      if (!farmerId) throw new Error(`Farmer not found: ${p.farmerId}`);

      // Validate farm
      const farmId = farmMap[p.farmId];
      if (!farmId) throw new Error(`Farm not found: ${p.farmId}`);

      // Check farm belongs to farmer
      if (farmOwnerMap[p.farmId] !== farmerId.toString()) {
        throw new Error(
          `Farm ${p.farmId} does not belong to farmer ${p.farmerId}`,
        );
      }

      return {
        legacyId: p.legacyId,
        name: p.name,
        category: catId,
        farmer: farmerId,
        farm: farmId,
        price: p.price,
        unit: ["kg", "ton"].includes(p.unit) ? p.unit : "kg",
        stock: p.stock,
        status: p.status,
        views: p.views ?? 0,
        sales: p.sales ?? 0,
        createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
      };
    });

    // Clear existing products and insert
    await Product.deleteMany({});
    await Product.insertMany(formattedProducts, { timestamps: false });

    console.log("✅ Products seeded successfully");
  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    throw err; // propagate to seedAll.js
  }
};

export default seedProducts;

// // src/seeds/seedProducts.js
// import Product from "../models/Product.js";
// import { products } from "./data.js"; // your products JSON

// const normalize = (str) => str.trim().toLowerCase();

// /**
//  * Seed Products
//  * @param {Object} params - Lookup maps from seedAll
//  * @param {Array} params.categories - Category documents from DB
//  * @param {Array} params.farmers - User documents with role "farmer"
//  * @param {Array} params.farms - Farm documents
//  */
// const seedProducts = async ({ categories, farmers, farms }) => {
//   try {
//     // Build lookup maps
//     const categoryMap = {};
//     categories.forEach((c) => {
//       categoryMap[normalize(c.name)] = c._id;
//     });

//     const farmerMap = {};
//     farmers.forEach((f) => {
//       farmerMap[f.legacyId] = f._id;
//     });

//     const farmMap = {};
//     const farmOwnerMap = {};
//     farms.forEach((f) => {
//       farmMap[f.legacyId] = f._id;
//       farmOwnerMap[f.legacyId] = f.farmer.toString(); // store farmer _id for validation
//     });

//     // Transform products
//     const formattedProducts = products.map((p) => {
//       if (!categoryMap[normalize(p.category)])
//         throw new Error(`Category not found: ${p.category}`);

//       if (!farmerMap[p.farmerId])
//         throw new Error(`Farmer not found: ${p.farmerId}`);

//       if (!farmMap[p.farmId]) throw new Error(`Farm not found: ${p.farmId}`);

//       if (farmOwnerMap[p.farmId] !== farmerMap[p.farmerId].toString()) {
//         throw new Error(
//           `Farm ${p.farmId} does not belong to farmer ${p.farmerId}`,
//         );
//       }

//       return {
//         legacyId: p.legacyId,
//         name: p.name,
//         category: categoryMap[normalize(p.category)],
//         farmer: farmerMap[p.farmerId],
//         farm: farmMap[p.farmId],
//         price: p.price,
//         unit: ["kg", "ton"].includes(p.unit) ? p.unit : "kg",
//         stock: p.stock,
//         status: p.status,
//         views: p.views ?? 0,
//         sales: p.sales ?? 0,
//         createdAt: p.createdAt ? new Date(p.createdAt) : new Date(),
//       };
//     });

//     // Insert into DB
//     await Product.insertMany(formattedProducts, { timestamps: false });
//     console.log(`✅ ${formattedProducts.length} Products seeded successfully`);
//   } catch (err) {
//     console.error("❌ Seeding Products failed:", err.message);
//     throw err; // Let seedAll handle process.exit
//   }
// };

// export default seedProducts;

// ================
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import Product from "../models/Product.js";
// import Category from "../models/Category.js";
// import User from "../models/User.js";
// import Farm from "../models/Farm.js";
// import { products } from "./data.js";

// dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD,
// );

// const normalize = (str) => str.trim().toLowerCase();

// const seedProducts = async () => {
//   try {
//     await mongoose.connect(DB);
//     console.log("✅ DB connected");

//     const categories = await Category.find();
//     const farmers = await User.find({ legacyId: { $exists: true } });
//     const farms = await Farm.find();

//     const categoryMap = {};
//     categories.forEach((c) => {
//       categoryMap[normalize(c.name)] = c._id;
//     });

//     const farmerMap = {};
//     farmers.forEach((f) => {
//       farmerMap[f.legacyId] = f._id;
//     });

//     const farmMap = {};
//     const farmOwnerMap = {};
//     farms.forEach((f) => {
//       farmMap[f.legacyId] = f._id;
//       farmOwnerMap[f.legacyId] = f.farmer.toString();
//     });

//     const formattedProducts = products.map((p) => {
//       if (!categoryMap[normalize(p.category)])
//         throw new Error(`Category not found: ${p.category}`);

//       if (!farmerMap[p.farmerId])
//         throw new Error(`Farmer not found: ${p.farmerId}`);

//       if (!farmMap[p.farmId]) throw new Error(`Farm not found: ${p.farmId}`);

//       if (farmOwnerMap[p.farmId] !== farmerMap[p.farmerId].toString()) {
//         throw new Error(
//           `Farm ${p.farmId} does not belong to farmer ${p.farmerId}`,
//         );
//       }

//       return {
//         legacyId: p.legacyId,
//         name: p.name,
//         category: categoryMap[normalize(p.category)],
//         farmer: farmerMap[p.farmerId],
//         farm: farmMap[p.farmId],
//         price: p.price,
//         unit: ["kg", "ton"].includes(p.unit) ? p.unit : "kg",
//         stock: p.stock,
//         status: p.status,
//         views: p.views ?? 0,
//         sales: p.sales ?? 0,
//         createdAt: new Date(p.createdAt),
//       };
//     });

//     await Product.deleteMany({});
//     await Product.insertMany(formattedProducts, { timestamps: false });

//     console.log("✅ Products seeded successfully");
//     process.exit();
//   } catch (err) {
//     console.error("❌ Seeding failed:", err.message);
//     process.exit(1);
//   }
// };

// seedProducts();
// ==================================
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
