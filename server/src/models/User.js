// import mongoose from "mongoose";

// // Schema definition: for doing some validations
// const userSchema = new mongoose.Schema({
//   name: { type: String, required: [true, "Name is required"], trim: true },
//   role: {
//     type: String,
//     enum: ["farmer", "buyer", "admin"],
//     default: "farmer",
//   },
//   location: { type: String, required: true },
//   phone: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   summary: { type: String, trim: true },
//   products: [String],
//   farms: [String],
//   createdAt: { type: Date, default: Date.now },
// });

// // Model creation
// export const User = mongoose.model("User", userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    businessName: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["farmer", "buyer", "admin"],
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    status: {
      type: String,
      enum: ["active", "suspended", "pending", "inactive"],
      default: "pending",
    },

    verificationStatus: {
      type: String,
      enum: ["pending", "verified", "rejected"],
      default: "pending",
      index: true,
    },

    legacyId: {
      type: String,
      unique: true,
      index: true,
    },
  },

  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;
