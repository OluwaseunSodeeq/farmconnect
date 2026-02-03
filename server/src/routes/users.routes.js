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

// import express from "express";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const usersRouter = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Read and Parse users JSON data
// const usersPath = path.join(__dirname, "../data/db.json");
// const usersData = JSON.parse(fs.readFileSync(usersPath, { encoding: "utf-8" }));

// // GET ALL USERS
// const getAllUsers = (req, res) => {
//   res.status(200).json({
//     status: "success",
//     results: usersData.users.length,
//     data: { usersData },
//   });
// };

// // GET SINGLE USER
// const getUser = (req, res) => {
//   const fileData = fs.readFileSync(usersFilePath, "utf-8");
//   const usersData = JSON.parse(fileData);

//   const user = usersData.farmers.find((f) => f.farmerId === req.params.id);

//   if (!user) {
//     return res.status(404).json({
//       status: "error",
//       message: "Farmer not found.",
//     });
//   }

//   res.status(200).json({
//     status: "success",
//     data: user,
//   });
// };

// // CREATE USER
// const createUser = (req, res) => {
//   try {
//     const fileData = fs.readFileSync(usersFilePath, "utf-8");
//     const usersData = JSON.parse(fileData);

//     const newFarmer = req.body;
//     const duplicate = usersData.farmers.some(
//       (f) => f.farmerId === newFarmer.farmerId
//     );

//     if (duplicate) {
//       return res.status(409).json({
//         status: "error",
//         message: "Farmer with this ID already exists.",
//       });
//     }

//     usersData.farmers.push(newFarmer);
//     usersData.stats.totalFarmers.count += 1;

//     fs.writeFileSync(
//       usersFilePath,
//       JSON.stringify(usersData, null, 2),
//       "utf-8"
//     );

//     res.status(201).json({
//       status: "success",
//       data: newFarmer,
//     });
//   } catch (error) {
//     res.status(500).json({ status: "error", message: error.message });
//   }
// };

// // UPDATE USER
// const updateUser = (req, res) => {
//   const fileData = fs.readFileSync(usersFilePath, "utf-8");
//   const usersData = JSON.parse(fileData);

//   const farmerId = req.params.id;
//   const updatedData = req.body;

//   const allowedStatus = ["verified", "pending", "suspended"];
//   if (!allowedStatus.includes(updatedData.status)) {
//     return res.status(400).json({
//       status: "Fail",
//       message: "Invalid status value.",
//     });
//   }

//   const user = usersData.farmers.find((f) => f.farmerId === farmerId);
//   if (!user)
//     return res
//       .status(404)
//       .json({ status: "error", message: "Farmer not found." });

//   user.status = updatedData.status;

//   fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2), "utf-8");
//   res.status(200).json({ status: "success", data: user });
// };

// // DELETE USER
// const deleteUser = (req, res) => {
//   const fileData = fs.readFileSync(usersFilePath, "utf-8");
//   const usersData = JSON.parse(fileData);

//   const farmerIndex = usersData.farmers.findIndex(
//     (f) => f.farmerId === req.params.id
//   );
//   if (farmerIndex === -1)
//     return res
//       .status(404)
//       .json({ status: "error", message: "Farmer not found." });

//   usersData.farmers.splice(farmerIndex, 1);
//   usersData.stats.totalFarmers.count -= 1;

//   fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2), "utf-8");
//   res.status(204).json({ status: "success", data: null });
// };

// // ROUTES
// usersRouter.route("/users").get(getAllUsers).post(createUser);
// usersRouter
//   .route("/users/:id")
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);

// export default usersRouter;

/*
users.routes.js

Source of truth for people

Uses:

Users

Farms

Verifications

Example responsibilities:

Get all users

Create farmer / buyer

Prevent duplicate IDs

Approve / suspend users (PATCH)

Endpoints:

GET    /api/v1/users
POST   /api/v1/users
PATCH  /api/v1/users/:id/status
*/
