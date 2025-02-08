import { Inventory } from "../model/inventoryModel.js";

const createInventory = async (req, res) => {
  const { name, companyName, quantity, size, price, processing } = req.body;

  if (!name || !companyName || !quantity || !size || !price) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const inventoryItem = await Inventory.create({
      name,
      companyName,
      quantity,
      size,
      price,
      processing,
    });

    res.status(201).json({
      message: "Inventory item created successfully",
      data: inventoryItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while creating inventory item",
      error: error.message,
    });
  }
};
const getAllInventoryItems = async (req, res) => {
  try {
    const inventoryItems = await Inventory.find();

    res.status(200).json({
      message: "All inventory items retrieved successfully",
      data: inventoryItems,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while retrieving inventory items",
      error: error.message,
    });
  }
};

const getInventoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const inventoryItem = await Inventory.findById(id);
    res.status(200).json({
      message: "Inventory item retrieved successfully",
      data: inventoryItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving inventory item",
      error: error.message,
    });
  }
};
const updateInventoryById = async (req, res) => {
  const { id } = req.params;
  const { name, companyName, quantity, size, price, processing } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ message: "Item id is required" });
    }
    const updatedInventory = await Inventory.findByIdAndUpdate(id, {
      name,
      companyName,
      quantity,
      size,
      price,
      processing,
    });
    if (!updatedInventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json({
      message: "Inventory item updated successfully",
      data: updatedInventory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating inventory item",
      error: error.message,
    });
  }
};
const deleteInventoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedInventory = await Inventory.findByIdAndDelete(id);
    if (!deletedInventory) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    res.status(200).json({
      message: "Inventory item deleted successfully",
      data: deletedInventory,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting inventory item",
      error: error.message,
    });
  }
};

export {
  createInventory,
  getAllInventoryItems,
  getInventoryById,
  updateInventoryById,
  deleteInventoryById,
};
