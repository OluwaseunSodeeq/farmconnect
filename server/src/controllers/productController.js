import Farm from "../models/Farm.js";
import Product from "../models/Product.js";

/**
 * GET ALL PRODUCTS
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("farmer").populate("farm");

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET SINGLE PRODUCT BY ID
 */
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("farmer")
      .populate("farm");

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * CREATE PRODUCT
 */
export const createProduct = async (req, res) => {
  try {
    const { legacyId, farmer, farm } = req.body;

    // 1️⃣ Prevent duplicate legacyId
    const existingProduct = await Product.findOne({ legacyId });
    if (existingProduct) {
      return res.status(400).json({
        status: "fail",
        message: "Product with this legacyId already exists",
      });
    }

    // 2️⃣ Validate farm exists
    const farmDoc = await Farm.findById(farm);
    if (!farmDoc) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid farmId",
      });
    }

    // 3️⃣ Ensure farm belongs to farmer
    if (farmDoc.farmer.toString() !== farmer) {
      return res.status(400).json({
        status: "fail",
        message: "Farm does not belong to the specified farmer",
      });
    }

    // 4️⃣ Create product
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET PRODUCTS BY FARMER ID
 */
export const getProductsByFarmer = async (req, res) => {
  try {
    const products = await Product.find({
      farmer: req.params.farmerId,
    })
      .populate("farm")
      .populate("farmer");

    if (!products.length) {
      return res.status(404).json({
        status: "fail",
        message: "No products found for this farmer",
      });
    }

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * GET PRODUCTS BY FARM ID
 */
export const getProductsByFarm = async (req, res) => {
  try {
    const products = await Product.find({
      farm: req.params.farmId,
    })
      .populate("farm")
      .populate("farmer");

    if (!products.length) {
      return res.status(404).json({
        status: "fail",
        message: "No products found for this farm",
      });
    }

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ============ Later Modifications to Product Model

/*
Admin-only UPDATE product
export const updateProduct = async (req, res) => {
  try {
    requireAdmin(req, res);

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: product,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// ================
Admin-only DELETE product (soft delete ready)
export const deleteProduct = async (req, res) => {
  try {
    requireAdmin(req, res);

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

====================
GET ALL PRODUCTS with pagination & filters
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.status) filter.status = req.query.status;
    if (req.query.category) filter.category = req.query.category;
    if (req.query.farm) filter.farm = req.query.farm;
    if (req.query.farmer) filter.farmer = req.query.farmer;

    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) filter.price.$gte = req.query.minPrice;
      if (req.query.maxPrice) filter.price.$lte = req.query.maxPrice;
    }

    const products = await Product.find(filter)
      .populate("farmer farm category")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filter);

    res.status(200).json({
      status: "success",
      page,
      results: products.length,
      total,
      pages: Math.ceil(total / limit),
      data: products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

================
 * GET PRODUCTS BY CATEGORY

export const getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.categoryId,
    })
      .populate("farm")
      .populate("farmer");

    if (!products.length) {
      return res.status(404).json({
        status: "fail",
        message: "No products found for this category",
      });
    }

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

*/
