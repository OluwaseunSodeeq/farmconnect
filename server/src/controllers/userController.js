import mongoose from "mongoose";
import User from "../models/User.js";

// --------------------//
// CONTROLLERS
// --------------------//

// GET ALL USERS

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// GET SINGLE USER
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "User not found",
    });
  }
};

// CREATE USER
export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// // GET ALL USERS
// export const getAllUsers = (req, res) => {
//   const db = readDB();

//   res.status(200).json({
//     status: "success",
//     results: db.users.length,
//     data: db.users,
//   });
// };

// // GET SINGLE USER
// export const getUser = (req, res) => {
//   const db = readDB();

//   const requestedId = req.params.id?.trim().toLowerCase();

//   const user = db.users.find((u) => {
//     if (!u.userId) return false; // 👈 guard clause

//     return u.userId.trim().toLowerCase() === requestedId;
//   });

//   if (!user) {
//     return res.status(404).json({
//       status: "error",
//       message: "User not found",
//     });
//   }

//   res.status(200).json({
//     status: "success",
//     data: user,
//   });
// };

// // CREATE USER
// export const createUser = (req, res) => {
//   try {
//     const db = readDB();
//     const newUser = req.body;

//     if (!newUser.userId) {
//       return res.status(400).json({
//         status: "error",
//         message: "userId is required",
//       });
//     }

//     const exists = db.users.some((f) => f.userId === newUser.userId);

//     if (exists) {
//       return res.status(409).json({
//         status: "error",
//         message: "User already exists",
//       });
//     }

//     db.users.push(newUser);
//     db.stats.totalUsers.count++;

//     writeDB(db);

//     res.status(201).json({
//       status: "success",
//       data: newUser,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// };

// // UPDATE USER
// export const updateUser = (req, res) => {
//   try {
//     const db = readDB();
//     const { id } = req.params;
//     const { status } = req.body;

//     const allowedStatus = ["verified", "pending", "suspended"];
//     if (!allowedStatus.includes(status)) {
//       return res.status(400).json({
//         status: "error",
//         message: "Invalid status value",
//       });
//     }

//     const user = db.users.find((f) => f.userId === id);

//     if (!user) {
//       return res.status(404).json({
//         status: "error",
//         message: "User not found",
//       });
//     }

//     user.status = status;

//     writeDB(db);

//     res.status(200).json({
//       status: "success",
//       data: user,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// };

// // DELETE USER
// export const deleteUser = (req, res) => {
//   try {
//     const db = readDB();
//     const { id } = req.params;

//     const index = db.users.findIndex((f) => f.userId === id);

//     if (index === -1) {
//       return res.status(404).json({
//         status: "error",
//         message: "User not found",
//       });
//     }

//     db.users.splice(index, 1);
//     db.stats.totalUsers.count--;

//     writeDB(db);

//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({
//       status: "error",
//       message: err.message,
//     });
//   }
// };
