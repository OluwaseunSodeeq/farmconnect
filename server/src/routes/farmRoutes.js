import express from "express";
import {
  getAllFarms,
  getFarm,
  createFarm,
  updateFarm,
  deleteFarm,
} from "../controllers/farmController.js";

const router = express.Router();
router.route("/").get(getAllFarms).post(createFarm);
router.route("/:id").get(getFarm).patch(updateFarm).delete(deleteFarm);

export default router;
