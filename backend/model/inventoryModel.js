import mongoose, { Schema } from "mongoose";

const inventorySchema = new Schema(
  {
    name: { type: String, required: true },
    companyName: { type: String, required: true },
    quantity: { type: Number, required: true },
    size: { type: String, required: true },
    price: { type: String, required: true },
    processing: {
      type: String,
      enum: ["pending", "sent for sewing", "completed"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

export const Inventory = mongoose.model("Inventory", inventorySchema);
