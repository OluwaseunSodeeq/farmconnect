import dotenv from "dotenv";
import mongoose from "mongoose";

import User from "../models/User.js";
import { users } from "./data.js";

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD,
);

const seedUsers = async () => {
  try {
    await mongoose.connect(DB);
    console.log("DB connected");

    const formattedUsers = users.map((u) => ({
      legacyId: u.legacyId,
      name: u.name,
      role: u.role,
      businessName: u.businessName,
      phone: u.phone,
      email: u.email,
      location: u.location,
      status: u.status,
      createdAt: u.createdAt,
    }));

    await User.deleteMany({});
    await User.insertMany(formattedUsers);

    console.log("Users seeded successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
