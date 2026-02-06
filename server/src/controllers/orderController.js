import Product from "../models/Product.js";
import { readDB } from "../services/db.service.js";

// --------------------
// ORDERS CONTROLLERS FOR ADMIN
// --------------------

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { items, farm, farmer } = req.body;
    if (!items || !items.length)
      return res.status(400).json({ message: " Order items required" });
    let orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product)
        return res
          .status(404)
          .json({ message: `Product not found ${item.productId}` });
      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        product: product._id,
        name: product.name,
        unit: product.unit,
        quantity: product.quantity,
        subtotal,
      });

      const order = await order.create({
        buyer: req.user._id,
        farmer,
        farm,
        items: orderItems,
        totalAmount,
        currency: "UGX",
        paymentStatus: "pending",
        orderStatus: "pending",
      });

      res.status(201).json({
        status: "success",
        data: order,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL ORDERS
export const getAllOderById = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyer farmer farm")
      .populate("items.product");

    res.status(200).json({
      status: "success",
      result: orders.length,
      data: orders,
    });
  } catch (err) {
    res.status.json({ error: err.message });
  }
};
// UPDATE ORDER STATUS

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await order.findByIdAndUpdate(
      req.params.id,
      { orderStatus, paymentStatus },
      { new: true, runValidators: true },
    );

    if (!order) return res.status(404).json({ message: "Order not Found" });

    res.status(200).json({ status: "success", data: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE ORDER
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found!" });

    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------
// ORDERS CONTROLLERS FOR BUYERS
// -----------------------------
export const getMyOrders = async (req, res) => {
  try {
    const buyerOrders = await Order.find({ buyer: req.user._id })
      .populate("farm")
      .populate("items.product");

    res.status(200).json({
      status: "success",
      results: buyerOrders.length,
      data: buyerOrders,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//  =========================
//  GET SINGLE ORDER
//  BUYER  & ADMIN
//  =========================

// GET ORDER
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req, URLSearchParams.id)
      .populate("buyer farmer farm")
      .populate("items.product");

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (
      req.user.role === "buyer" &&
      order.buyer.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access Denied" });
    }

    res.status(200).json({ data: order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
