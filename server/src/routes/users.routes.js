import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
  getMe,
  updateMe,
  deleteMe,
} from "../controllers/userController.js";
import { getUserStats } from "../Ui/getUsersStats.js";
import { protect, restrictTo } from "../middleware/auth.middleware.js";

const usersRouter = express.Router();

// All routes below require login
usersRouter.use(protect);

// Logged-inn users routes (farmer/buyer/admin)
usersRouter.get("/me", getMe);
usersRouter.patch("/me", updateMe);
usersRouter.delete("/me", deleteMe);

// --------------------
// Admin Only ROUTES
// --------------------

usersRouter.use(restrictTo("admin"));
usersRouter.route("/stats", getUserStats);
usersRouter.route("/").get(getAllUsers).post(createUser);
usersRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default usersRouter;
