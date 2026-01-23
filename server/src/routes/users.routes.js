import express from "express";
import { readDB, writeDB } from "../services/db.service.js";

const usersRouter = express.Router();

// --------------------
// CONTROLLERS
// --------------------

// GET ALL USERS
const getAllUsers = (req, res) => {
  const db = readDB();

  res.status(200).json({
    status: "success",
    results: db.users.length,
    data: db.users,
  });
};

// GET SINGLE USER
const getUser = (req, res) => {
  const db = readDB();
  const user = db.users.find((f) => f.userId === req.params.id);

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
};

// CREATE USER
const createUser = (req, res) => {
  try {
    const db = readDB();
    const newUser = req.body;

    if (!newUser.userId) {
      return res.status(400).json({
        status: "error",
        message: "userId is required",
      });
    }

    const exists = db.users.some((f) => f.userId === newUser.userId);

    if (exists) {
      return res.status(409).json({
        status: "error",
        message: "User already exists",
      });
    }

    db.users.push(newUser);
    db.stats.totalUsers.count++;

    writeDB(db);

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// UPDATE USER
const updateUser = (req, res) => {
  try {
    const db = readDB();
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = ["verified", "pending", "suspended"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        status: "error",
        message: "Invalid status value",
      });
    }

    const user = db.users.find((f) => f.userId === id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    user.status = status;

    writeDB(db);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// DELETE USER
const deleteUser = (req, res) => {
  try {
    const db = readDB();
    const { id } = req.params;

    const index = db.users.findIndex((f) => f.userId === id);

    if (index === -1) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    db.users.splice(index, 1);
    db.stats.totalUsers.count--;

    writeDB(db);

    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

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
