import express from "express";

import {
  getAllOrders,
  getAllProducts,
  getAllUsers,
} from "../controllers/adminController.js";

const adminRouter = express.Router();

// ROUTES
adminRouter.get("/orders", getAllOrders);
adminRouter.get("/users", getAllUsers);
adminRouter.get("/products", getAllProducts);

export default adminRouter;

// import express from "express";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const adminRouter = express.Router();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const dashboardPath = path.join(__dirname, "../../mock/dashboard.json");

// // Read and parse the dashboard JSON data
// const dashboardData = JSON.parse(
//   fs.readFileSync(dashboardPath, { encoding: "utf-8" })
// );

// // Read and Parse orders JSON data
// const ordersPath = path.join(__dirname, "../data/db.json");
// const ordersData = JSON.parse(
//   fs.readFileSync(ordersPath, { encoding: "utf-8" })
// );

// // Read and Parse analytics JSON data
// const analyticsPath = path.join(__dirname, "../../mock/analytics.json");
// const analyticsData = JSON.parse(
//   fs.readFileSync(analyticsPath, { encoding: "utf-8" })
// );

// // Read and Parse compliance JSON data
// const compliancePath = path.join(__dirname, "../../mock/compliance.json");
// const complianceData = JSON.parse(
//   fs.readFileSync(compliancePath, { encoding: "utf-8" })
// );

// // Read and Parse reports JSON data
// const reportsPath = path.join(__dirname, "../../mock/reports.json");
// const reportsData = JSON.parse(
//   fs.readFileSync(reportsPath, { encoding: "utf-8" })
// );

// // ADMIN COMPUTED ROUTES

// // GET DASHBOARD
// adminRouter.get("/dashboard", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     results: dashboardData.length,
//     data: { dashboardData },
//   });
// });

// const getAllOrders = (req, res) => {
//   res.status(200).json({
//     status: "success",
//     results: ordersData.length,
//     data: { ordersData },
//   });
// };
// adminRouter.route("/orders").get(getAllOrders);

// adminRouter.get("/analytics", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     results: analyticsData.length,
//     data: { analyticsData },
//   });
// });
// adminRouter.get("/compliances", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     results: complianceData.length,
//     data: { complianceData },
//   });
// });
// adminRouter.get("/reports", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     results: reportsData.length,
//     data: { reportsData },
//   });
// });

// export default adminRouter;

/*
admin.routes.js

Derived & computed data only

This is important 👇
Admin routes DO NOT own data — they compute from it.

Uses:

Users

Products

Orders

Verifications

Example responsibilities:

Dashboard counts

Pending approvals

Revenue summaries
eports metadata

Endpoints:

GET /api/v1/admin/dashboard
GET /api/v1/admin/approvals
GET /api/v1/admin/reports
*/
