import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import adminRoutes from "./routes/admin.routes.js";
import usersRoutes from "./routes/users.routes.js";
import productsRoutes from "./routes/products.routes.js";

dotenv.config();

const app = express();

/* ========= Global Middlewares ========= */
// third party middleware
app.use(morgan("dev"));
app.use(cors()); //allows cross origin requests

//
/*
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

*/
//
// built-in middleware
app.use(express.json());

/* ========= Custom Logger ========= */
app.use((req, res, next) => {
  console.log("Custom Middleware Invoked");
  console.log(`${req.method} : ${req.path} - ${new Date().toISOString()}`);
  next();
});

/* ========= Public APIs ========= */
// app.get("/api/v1/farmers", (req, res) => {
//   res.status(200).json({
//     message: "List of farmers",
//     app: "Farmconnect",
//   });
// });

/* ========= Admin APIs Routes ========= */
app.use("/api/v1/admin", adminRoutes); // admin routes
app.use("/api/v1/users", usersRoutes); // user routes
app.use("/api/v1/products", productsRoutes); // product routes

export default app;
