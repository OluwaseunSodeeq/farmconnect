import express from "express";
// import { checkUserId, checkUserBody } from "../controllers/userController.js";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} from "../controllers/userController.js";
const usersRouter = express.Router();

// usersRouter.param("id", checkUserId);
// usersRouter.param("id");

// --------------------
// ROUTES
// --------------------
usersRouter.route("/").get(getAllUsers).post(createUser);
usersRouter.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default usersRouter;
