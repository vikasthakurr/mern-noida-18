import express from "express";
import Order from "../models/Order.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import verifyToken from "../middleware/auth.middleware.js";
import { createOrderLimiter, getOrdersLimiter } from "../config/rateLimit.config.js";

const orderController = express.Router();

// POST /api/v1/orders — create a new order
// requires: user (from token), orderItems[], totalPrice
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    throw new ApiError(400, "No order items provided");
  }

  const order = await Order.create({
    user: req.user.id,
    orderItems,
    totalPrice,
  });

  res.status(201).json({ order });
});

// GET /api/v1/orders — get all orders (admin use)
const getAllOrders = asyncHandler(async (_req, res) => {
  const orders = await Order.find().populate("user", "name email");
  res.status(200).json({ orders });
});

// GET /api/v1/orders/myorders — get orders for the logged-in user
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json({ orders });
});

// GET /api/v1/orders/:id — get a single order by id
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate("user", "name email");
  if (!order) throw new ApiError(404, "Order not found");

  res.status(200).json({ order });
});

// PUT /api/v1/orders/:id/status — update order status
// setting status to "delivered" automatically marks isPaid and isDelivered
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, "Order not found");

  order.status = status;

  if (status === "delivered") {
    order.isPaid = true;
    order.isDelivered = true;
  }

  await order.save();
  res.status(200).json({ order });
});

// DELETE /api/v1/orders/:id — delete an order
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, "Order not found");

  await order.deleteOne();
  res.status(200).json({ message: "Order deleted successfully" });
});

// routes
orderController.post("/", createOrderLimiter, verifyToken, createOrder);
orderController.get("/", getOrdersLimiter, verifyToken, getAllOrders);
orderController.get("/myorders", verifyToken, getUserOrders);
orderController.get("/:id", verifyToken, getOrderById);
orderController.put("/:id/status", verifyToken, updateOrderStatus);
orderController.delete("/:id", verifyToken, deleteOrder);

export default orderController;
