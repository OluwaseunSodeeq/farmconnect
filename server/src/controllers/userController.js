import User from "../models/User.js";

// --------------------//
// CONTROLLERS
// --------------------//

// GET ALL USERS

export const getAllUsers = async (req, res) => {
  try {
    // const users = await User.find();

    // res.status(200).json({
    //   status: "success",
    //   results: users.length,
    //   data: users,
    // });

    const features = new APIFeatures(User.find(), req.query)
      .search(["name", "description"])
      .filter()
      .sort()
      .limitFields()
      .visibleData();
    // .paginate();

    const users = await features.query;

    res
      .status(200)
      .json({ status: "success", results: users.length, data: users });

    //frontend call:GET /users?role=farmer&page=2&limit=10&sort=-createdAt
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
