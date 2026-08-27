import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Customer name is compulsory."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Customer email is compulsory."],
      trim: true,
      lowercase: true,
    },
    contactNumber: {
      type: String,
      required: [true, "Contact number is compulsory."],
      trim: true,
    },
    items: {
      type: [orderItemSchema],
      validate: {
        validator: (items) => Array.isArray(items) && items.length > 0,
        message: "At least one product must be selected.",
      },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);