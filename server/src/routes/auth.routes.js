import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";
import { loginLimiter } from "../middleware/rateLimit.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", loginLimiter, login);

authRouter.get("/dashboard", protect, restrictTo("admin"), (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

export default authRouter;

// import express from "express";
// import { login, register } from "../controllers/auth.controller";
// import { loginLimiter } from "../middleware/rateLimit.middleware";

// const authRoutes = express.Router();

// authRoutes.post("/register", register);

// // 🔥 Apply limiter ONLY to login
// authRoutes.post("/login", loginLimiter, login);

// export default authRoutes;
