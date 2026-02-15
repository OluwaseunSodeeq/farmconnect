import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/userController.js";
import { getUserStats } from "../Ui/getUsersStats.js";
const usersRouter = express.Router();

// --------------------
// ROUTES
// --------------------
usersRouter.route("/stats", getUserStats);
usersRouter.route("/").get(getAllUsers).post(createUser);
usersRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default usersRouter;
