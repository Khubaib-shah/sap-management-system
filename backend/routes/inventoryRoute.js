import express from "express";
import {
  createInventory,
  deleteInventoryById,
  getAllInventoryItems,
  getInventoryById,
  updateInventoryById,
} from "../controllers/inventoryController.js";
const router = express.Router();

router.route("/").post(createInventory).get(getAllInventoryItems);

router
  .route("/:id")
  .get(getInventoryById)
  .put(updateInventoryById)
  .delete(deleteInventoryById);

export default router;
