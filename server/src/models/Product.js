// models/Product.js
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    farm: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      enum: ["kg", "ton", "bag", "crate", "piece"],
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    views: {
      type: Number,
      default: 0,
    },

    sales: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

export const Product = mongoose.model("Product", productSchema);

// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//       index: true,
//     },

//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//       index: true,
//     },

//     farmer: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true,
//     },

//     farm: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Farm",
//       required: true,
//       index: true,
//     },

//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     unit: {
//       type: String,
//       enum: ["kg", "g", "ton", "crate", "bag"],
//       required: true,
//     },

//     stock: {
//       type: Number,
//       required: true,
//       min: 0,
//     },

//     status: {
//       type: String,
//       enum: ["pending", "approved", "rejected", "sold_out"],
//       default: "pending",
//       index: true,
//     },

//     views: {
//       type: Number,
//       default: 0,
//     },

//     sales: {
//       type: Number,
//       default: 0,
//     },
//   },
//   {
//     timestamps: true,
//   },
// );

// export const Product = mongoose.model("Product", productSchema);
