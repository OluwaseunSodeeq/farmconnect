import mongoose from "mongoose";

const { Schema } = mongoose;

const orderItemSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true, // snapshot for frontend
    },

    unit: {
      type: String,
      enum: ["kg", "ton"],
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 10,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    legacyId: {
      type: String,
      unique: true,
      index: true,
    },

    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    farmer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    farm: {
      type: Schema.Types.ObjectId,
      ref: "Farm",
      required: true,
    },

    items: {
      type: [orderItemSchema],
      validate: [(val) => val.length > 0, "Order must have items"],
    },

    currency: {
      type: String,
      default: "UGX",
    },

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderStatus: {
      type: String,
      enum: ["pending", "processing", "in-transit", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

// import mongoose from "mongoose";

// const orderItemSchema = new mongoose.Schema(
//   {
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     unit: {
//       type: String,
//       enum: ["kg", "tons"],
//       required: true,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       min: 10,
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     subtotal: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//   },
//   { _id: false },
// );

// const orderSchema = new mongoose.Schema(
//   {
//     legacyId: {
//       type: String,
//       unique: true,
//       index: true,
//     },
//     buyer: {
//       type: mongooseSchema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     farmer: {
//       type: mongooseSchema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     farm: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: Farm,
//       required: true,
//     },
//     items: {
//       type: [orderItemSchema],
//       required: true,
//     },
//     totalAmount: {
//       type: Number,
//       required: true,
//       min: 0,
//     },
//     currency: {
//       type: String,
//       default: "UGX",
//     },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "paid", "failed"],
//       default: "pending",
//     },
//     orderStatus: {
//       type: String,
//       enum: ["prending", "confirmed", "processing", "delivered", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true },
// );

// const Order = mongoose.model("Order", orderSchema);
// export default Order;
