import express from "express";
import { login } from "../controllers/auth.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const router = express.Router();

// Admin Login
router.post("/login", login);

// Admin Dashboard (Protected)
router.get("/dashboard", protect, restrictTo("admin"), (req, res) => {
  res.json({
    message: "Welcome to Admin Dashboard",
  });
});

export default router;
