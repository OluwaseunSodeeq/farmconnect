import express from "express";
import {
  getAllFarms,
  getFarm,
  createFarm,
  updateFarm,
  deleteFarm,
} from "../controllers/farmController.js";

const farmsRoutes = express.Router();
farmsRoutes.route("/").get(getAllFarms).post(createFarm);
farmsRoutes.route("/:id").get(getFarm).patch(updateFarm).delete(deleteFarm);

export default farmsRoutes;
