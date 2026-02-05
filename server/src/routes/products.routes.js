import express from "express";
import { readDB, writeDB } from "../services/db.service.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/productController.js";

const productsRouter = express.Router();

// --------------------
// ROUTES
// --------------------
productsRouter.route("/").get(getAllProducts).post(createProduct);
productsRouter
  .route("/:id")
  .get(getProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

export default productsRouter;

/*
products.routes.js

Source of truth for goods

Uses:

Products

Farms

Users (farmerId)

Example responsibilities:

Get all products

Get products by farmer

Update stock quantity

Approve / suspend products
Endpoints:
GET    /api/v1/products
GET    /api/v1/products/farmer/:farmerId
PATCH  /api/v1/products/:id/stock
PATCH  /api/v1/products/:id/status
*/
