import AppError from "../utils/appError";

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];

  const message = `Duplicate field value: ${value} .Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const error = Object.value(err.errors).map((el) => el.meassge);

  const message = `Invalid input data: ${error.join(" ")} `;
  return new AppError(message, 400);
};

const handleCastError = (err) => {
  const message = `Invalid ${err.path} : ${err.value}`;
  return new AppError(message, 400);
};

const sendErrorInDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorInProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("Error ", err);

    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};

const errorlController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorInDev(err, res);
  }

  if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (error.name === "CastError") error = handleCastError(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.code === "ValidationError")
      error = handleValidationErrorDB(error);

    sendErrorInProd(error, res);
  }
};

export default errorlController;
