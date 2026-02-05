import mongoose from "mongoose";
import Farm from "../models/Farm.js";
import User from "../models/User.js";
import { farms } from "./data.js";

const seedFarms = async () => {
  try {
    // Get all farmers
    const farmers = await User.find({ legacyId: { $exists: true } });
    if (!farmers.length) throw new Error("No farmers found in DB");

    // Build legacyId → ObjectId map
    const farmerMap = {};
    farmers.forEach((f) => {
      farmerMap[f.legacyId] = f._id;
    });

    const allowedSoilTypes = ["Loamy", "Sandy", "Clay", "Silty", "Silty Loam"];

    // Map farms to actual farmer IDs
    const formattedFarms = farms.map((f) => {
      if (!farmerMap[f.farmerId]) {
        throw new Error(
          `❌ Farmer ${f.farmerId} not found for farm ${f.legacyId}`,
        );
      }

      return {
        legacyId: f.legacyId,
        name: f.name,
        location: f.location,
        farmer: farmerMap[f.farmerId], // strict mapping
        sizeHectares: f.sizeHectares,
        soilType: allowedSoilTypes.includes(f.soilType) ? f.soilType : "Loamy",
        irrigation: f.irrigation ?? false,
        certified: f.certified ?? false,
        status: f.status ?? "active",
        createdAt: f.createdAt ? new Date(f.createdAt) : new Date(),
        isDeleted: f.isDeleted ?? false,
      };
    });

    // Insert farms
    await Farm.insertMany(formattedFarms);

    console.log("✅ Farms seeded successfully");
  } catch (err) {
    console.error("❌ Error seeding farms:", err.message);
    throw err;
  }
};

export default seedFarms;

// import Farm from "../models/Farm.js";
// import User from "../models/User.js";
// import { farms } from "./data.js";

// const seedFarms = async () => {
//   // Build farmer legacy → ObjectId map
//   const farmers = await User.find();
//   const farmerMap = {};

//   farmers.forEach((f) => {
//     farmerMap[f.legacyId] = f._id;
//   });

//   const allowedSoilTypes = ["Loamy", "Sandy", "Clay", "Silty", "Silty Loam"];

//   const formattedFarms = farms.map((f) => {
//     if (!farmerMap[f.farmerId]) {
//       throw new Error(
//         `❌ Farmer ${f.farmerId} not found for farm ${f.legacyId}`,
//       );
//     }

//     return {
//       legacyId: f.legacyId,
//       name: f.name,
//       location: f.location,
//       farmer: farmerMap[f.farmerId],
//       sizeHectares: f.sizeHectares,
//       soilType: allowedSoilTypes.includes(f.soilType) ? f.soilType : "Loamy",
//       irrigation: f.irrigation ?? false,
//       certified: f.certified ?? false,
//       status: f.status ?? "active",
//       createdAt: new Date(f.createdAt),
//       isDeleted: f.isDeleted ?? false,
//     };
//   });

//   await Farm.insertMany(formattedFarms);

//   console.log("✅ Farms seeded");
// };

// export default seedFarms;

// =============
// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import Farm from "../models/Farm.js";
// import { farms } from "./data.js";
// import User from "../models/User.js";

// dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD,
// );

// const seedFarms = async () => {
//   try {
//     // Connect to DB
//     await mongoose.connect(DB);

//     // Get all farmers
//     const farmers = await User.find({ role: "farmer" });
//     if (!farmers.length) throw new Error("No farmers found in DB");

//     // Assign farmers to farms (round-robin)
//     let farmerIndex = 0;
//     const formattedFarms = farms.map((f) => {
//       const farmer = farmers[farmerIndex % farmers.length];
//       farmerIndex++;

//       // Fix soilType to match enum
//       const allowedSoilTypes = [
//         "Loamy",
//         "Sandy",
//         "Clay",
//         "Silty",
//         "Silty Loam",
//       ];
//       const soilType = allowedSoilTypes.includes(f.soilType)
//         ? f.soilType
//         : "Loamy";

//       return {
//         legacyId: f.legacyId,
//         name: f.name,
//         location: f.location,
//         farmer: farmer._id,
//         sizeHectares: f.sizeHectares,
//         soilType: f.soilType ?? "Loamy",
//         irrigation: f.irrigation ?? false,
//         certified: f.certified ?? false,
//         status: f.status ?? "active",
//         createdAt: f.createdAt ? new Date(f.createdAt) : new Date(),
//         isDeleted: f.isDeleted ?? false,
//       };
//     });

//     // Clear DB and insert farms
//     await Farm.deleteMany({});
//     await Farm.insertMany(formattedFarms);

//     process.exit();
//   } catch (err) {
//     console.error("❌ Error seeding farms:", err);
//     process.exit(1);
//   }
// };

// seedFarms();
// ===================
// dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD,
// );

// const seedFarms = async () => {
//   try {
//     await mongoose.connect(DB);

//     const farmers = await User.find({ role: "farmer" });

//     const farmerMap = {};
//     farmers.forEach((f) => (farmerMap[f.legacyId] = f._id));

//     const formmattedFarms = farms.map((f) => {
//       if (!farmerMap[f.farmerId]) {
//         throw new Error(`Farmer with legacyId ${f.farmerId} not found`);
//       }

//       return {
//         legacyId: f.legacyId,
//         name: f.name,
//         location: f.location,
//         farmer: farmerMap[f.farmerId],
//         sizeHectares: f.sizeHectares,
//         soilType: f.soilType,
//         irrigationType: f.irrigationType,
//         status: f.status,
//         createdAt: f.createdAt,
//       };
//     });
//     await Farm.deleteMany({});
//     await Farm.insertMany(formmattedFarms);
//     console.log("✅ Farms seeded successfully");
//     process.exit();
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };
