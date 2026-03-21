import mongoose from "mongoose";

// Order schema — tracks what was ordered, total cost, and fulfillment state
const orderSchema = new mongoose.Schema(
  {
    // reference to the user who placed the order
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },

    // array of items in the order — each references a Product document
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        price: { type: Number, required: true },
        product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
      },
    ],

    // total cost of all items combined
    totalPrice: { type: Number, required: true, default: 0.0 },

    // payment and delivery flags — updated when status changes to "delivered"
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },

    // order lifecycle status
    // setting to "delivered" automatically marks isPaid and isDelivered as true
    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  // automatically adds createdAt and updatedAt fields
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
