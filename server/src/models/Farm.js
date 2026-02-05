import mongoose from "mongoose";

const farmSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    sizeHectares: {
      type: Number,
      required: true,
      min: 0.25,
    },

    soilType: {
      type: String,
      enum: ["Loamy", "Sandy", "Clay", "Silty", "Silty Loam"],
      trim: true,
    },

    irrigation: {
      type: Boolean,
      default: false,
    },

    certified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    isDeleted: {
      type: Boolean,
      default: false,
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

const Farm = mongoose.model("Farm", farmSchema);
export default Farm;
