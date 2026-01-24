import { readDB } from "../services/db.service.js";

// --------------------
// ORDERS CONTROLLERS
// --------------------
// GET ALL ORDERS (ADMIN)
export const getAllOrders = (req, res) => {
  const db = readDB();

  res.status(200).json({
    status: "success",
    results: db.orders.length,
    data: db.orders,
  });
};

// --------------------
// USERS CONTROLLERS
// --------------------
// GET ALL USERS (ADMIN)
export const getAllUsers = (req, res) => {
  const db = readDB();

  res.status(200).json({
    status: "success",
    results: db.users.length,
    data: db.users,
  });
};

// --------------------
// PRODUCTS CONTROLLERS
// --------------------
// GET ALL PRODUCTS (ADMIN)
export const getAllProducts = (req, res) => {
  const db = readDB();

  res.status(200).json({
    status: "success",
    results: db.products.length,
    data: db.products,
  });
};
