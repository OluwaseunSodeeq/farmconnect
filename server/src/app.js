import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import adminRoutes from "./routes/admin.routes.js";
import usersRoutes from "./routes/users.routes.js";
import farmsRoutes from "./routes/farms.routes.js";
import productsRoutes from "./routes/products.routes.js";
import orderRoutes from "./routes/orders.routes.js";

dotenv.config();

const app = express();

/* ========= Global Middlewares ========= */
if (process.env.NODE_ENV === "development") {
  // third party middleware
  app.use(morgan("dev"));
}
app.use(cors()); //allows cross origin requests

// built-in middleware
app.use(express.json());

/* ========= Custom Logger ========= */
app.use((req, res, next) => {
  console.log("Custom Middleware Invoked");
  console.log(`${req.method} : ${req.path} - ${new Date().toISOString()}`);
  next();
});

/* ========= Admin APIs Routes ========= */
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/users", usersRoutes); // users routes
app.use("/api/v1/farms", farmsRoutes);
app.use("/api/v1/products", productsRoutes);
app.use("/api/v1/orders", orderRoutes);

export default app;
