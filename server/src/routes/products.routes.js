import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const productsRouter = express.Router();

// --------------------
// ESM SAFE __dirname
// --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------
// FILE PATH
// --------------------
const productsPath = path.join(__dirname, "../data/db.json");

// --------------------
// HELPERS
// --------------------
const readProducts = () => {
  const data = fs.readFileSync(productsPath, "utf-8");
  return data ? JSON.parse(data) : [];
};

const writeProducts = (data) => {
  fs.writeFileSync(productsPath, JSON.stringify(data, null, 2), "utf-8");
};

// --------------------
// CONTROLLERS
// --------------------
const getAllProducts = (req, res) => {
  const products = readProducts();
  res.status(200).json({
    status: "success",
    results: products.length,
    data: products,
  });
};

const getProduct = (req, res) => {
  const products = readProducts();
  const product = products.find((p) => p.id === req.params.id);

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
