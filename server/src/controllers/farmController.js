import Farm from "../models/Farm.js";

// GET ALL FARMS
export const getAllFarms = async (req, res) => {
  try {
    const farms = await Farm.find({ isDeleted: false }).populate(
      "farmer",
      "name email",
    );
    res.status(200).json({
      status: "success",
      results: farms.length,
      data: farms,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// GET SINGLE FARM
export const getFarm = async (req, res) => {
  try {
    const farm = await Farm.findOne({
      _id: req.params.id,
      isDeleted: false,
    }).populate("farmer", "name email");
    if (!farm) {
      return res.status(404).json({
        status: "fail",
        message: "Farm not found",
      });
    }
    res.status(200).json({
      status: "success",
      data: farm,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// CREATE FARM
export const createFarm = async (req, res) => {
  try {
    const newFarm = await Farm.create(req.body);
    res.status(201).json({
      status: "success",
      data: newFarm,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// UPDATE FARM
export const updateFarm = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!farm || farm.isDeleted) {
      return res.status(404).json({
        status: "fail",
        message: "Farm not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: farm,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Soft-delete a farm
export const deleteFarm = async (req, res) => {
  try {
    const farm = await Farm.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true },
    );

    if (!farm) {
      return res.status(404).json({
        status: "fail",
        message: "Farm not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Farm deleted (soft-deleted)",
      data: farm,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }

  //   try {
  //     const { id } = req.params;

  //     // Check if user is admin
  //     if (req.user.role !== "admin") {
  //       return res.status(403).json({
  //         status: "fail",
  //         message: "Only admins can delete farms",
  //       });
  //     }

  //     const farm = await Farm.findByIdAndUpdate(
  //       id,
  //       { isDeleted: true },
  //       { new: true },
  //     );

  //     if (!farm) {
  //       return res.status(404).json({
  //         status: "fail",
  //         message: "Farm not found",
  //       });
  //     }

  //     res.status(200).json({
  //       status: "success",
  //       message: "Farm deleted (soft-deleted)",
  //       data: farm,
  //     });
  //   } catch (err) {
  //     res.status(500).json({
  //       status: "error",
  //       message: err.message,
  //     });
  //   }
};
