import jwt from "jsonwebtoken";

const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id }, // payload
    process.env.JWT_SECRET, // secret
    { expiresIn: process.env.JWT_EXPIRES_IN }, // expiry
  );

  user.password = undefined; // never send hashed password to client

  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

export default createSendToken;
