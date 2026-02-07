import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrder,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";

const orderRoutes = express.Router();

/**
 * ROOT
 * GET  → admin: all orders
 * POST → buyer: create order
 */
orderRoutes.route("/").get(getAllOrders).post(createOrder);

/**
 * BUYER
 */
orderRoutes.get("/my-orders", getMyOrders);

/**
 * SINGLE ORDER
 * GET    → buyer/admin
 * DELETE → admin
 */
orderRoutes.route("/:id").get(getOrder).delete(deleteOrder);

/**
 * ADMIN STATUS UPDATE
 */
orderRoutes.patch("/:id/status", updateOrderStatus);

/*
orderRoutes
  .route("/")
  .get(protect, restrictTo("admin"), getAllOrders)
  .post(protect, restrictTo("buyer", "admin"), createOrder);

*/

export default orderRoutes;
