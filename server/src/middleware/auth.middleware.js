import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "You are not logged in",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User no longer exists",
      });
    }

    if (user.status !== "active") {
      return res.status(403).json({
        status: "fail",
        message: "Account not active",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: "Invalid token",
    });
  }
};

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "Access denied",
      });
    }
    next();
  };
};
