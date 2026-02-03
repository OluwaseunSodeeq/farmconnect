import express from "express";
import { readDB, writeDB } from "../services/db.service.js";

const productsRouter = express.Router();

// --------------------
// CONTROLLERS
// --------------------
const getAllProducts = (req, res) => {
  const db = readDB();
  res.status(200).json({
    status: "success",
    results: db.products.length,
    data: db.products,
  });
};

const getProduct = (req, res) => {
  const db = readDB();
  const product = db.products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({
      status: "error",
      message: "Product not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
};

// --------------------
// ROUTES
// --------------------
productsRouter.route("/").get(getAllProducts);

productsRouter.route("/:id").get(getProduct);

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
