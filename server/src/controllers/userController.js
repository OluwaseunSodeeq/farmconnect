import { readDB, writeDB } from "../services/db.service.js";

export const checkUserId = (req, res, next, id) => {
  const db = readDB();
  const userExists = db.users.some((u) => u.id === id);
  if (!userExists) {
    return res.status(404).json({
      status: "fail",
      message: "User not found i.e invalid ID",
    });
  }
  next();
};

export const checkUserBody = (req, res, next, val) => {
  const { role, name } = req.body;
  if (!role || !name) {
    return res.status(400).json({
      status: "fail",
      message: "Missing required fields: role and name",
    });
  }

  next();
};

// --------------------
// CONTROLLERS
// --------------------

// GET ALL USERS
export const getAllUsers = (req, res) => {
  const db = readDB();

  res.status(200).json({
    status: "success",
    results: db.users.length,
    data: db.users,
  });
};

// GET SINGLE USER
export const getUser = (req, res) => {
  const db = readDB();
  const requestedId = req.params.id.trim();

  const user = db.users.find((u) => u.id && u.id.trim() === requestedId);

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
export const createUser = (req, res) => {
  const db = readDB();
  const newUser = req.body;

  if (!newUser.id) {
    return res.status(400).json({
      status: "error",
      message: "id is required",
    });
  }

  const exists = db.users.some((u) => u.id === newUser.id);
  if (exists) {
    return res.status(409).json({
      status: "error",
      message: "User already exists",
    });
  }

  db.users.push(newUser);
  writeDB(db);

  res.status(201).json({
    status: "success",
    data: newUser,
  });
};

// UPDATE USER
export const updateUser = (req, res) => {
  const db = readDB();
  const { id } = req.params;

  const user = db.users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  Object.assign(user, req.body);
  writeDB(db);

  res.status(200).json({
    status: "success",
    data: user,
  });
};

// DELETE USER
export const deleteUser = (req, res) => {
  const db = readDB();
  const index = db.users.findIndex((u) => u.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({
      status: "error",
      message: "User not found",
    });
  }

  db.users.splice(index, 1);
  writeDB(db);

  res.status(204).send();
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
