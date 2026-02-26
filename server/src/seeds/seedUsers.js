import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { users } from "./data.js"; // your user dataset

// Helper function to generate a password <= 12 chars
const generatePassword = (legacyId) => {
  // Simple 12-char password based on legacyId
  // You can customize the pattern if needed
  const base = `F@${legacyId}`; // e.g. F@USR020
  return base.length > 12 ? base.slice(0, 12) : base;
};

const seedUsers = async () => {
  try {
    const formattedUsers = await Promise.all(
      users.map(async (u) => {
        let passwordToUse;

        if (u.password) {
          // Use existing password
          passwordToUse = u.password;
        } else {
          // Generate password for users with no password
          passwordToUse = generatePassword(u.legacyId);
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(passwordToUse, 12);

        return {
          legacyId: u.legacyId,
          name: u.name,
          role: u.role,
          businessName: u.businessName || null,
          phone: u.phone,
          email: u.email.toLowerCase(),
          location: u.location,
          status: u.status || "pending",
          verificationStatus: u.verificationStatus || "pending",
          createdAt: u.createdAt ? new Date(u.createdAt) : new Date(),
          password: hashedPassword,
        };
      }),
    );

    await User.insertMany(formattedUsers);

    console.log("✅ Users seeded successfully");
  } catch (err) {
    console.error("❌ Failed to seed users:", err.message);
  }
};

export default seedUsers;

// import dotenv from "dotenv";
// import mongoose from "mongoose";

// import User from "../models/User.js";
// import { users } from "./data.js";

// dotenv.config({ path: "./config.env" });

// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD,
// );

// const seedUsers = async () => {
//   try {
//     await mongoose.connect(DB);
//     // console.log("DB connected");

//     const formattedUsers = users.map((u) => ({
//       legacyId: u.legacyId,
//       name: u.name,
//       role: u.role,
//       businessName: u.businessName,
//       phone: u.phone,
//       email: u.email,
//       location: u.location,
//       status: u.status,
//       createdAt: u.createdAt,
//     }));

//     await User.deleteMany({});
//     await User.insertMany(formattedUsers);

//     // console.log("Users seeded successfully");
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// seedUsers();
