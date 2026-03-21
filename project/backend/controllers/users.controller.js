import User from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

// GET /api/v1/auth/allusers — returns all registered users
export const getAllUsers = asyncHandler(async (_req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// PUT /api/v1/auth/update/:id — updates name, email, or password
// only provided fields are updated (partial update)
export const updateUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");

  if (name) user.name = name;
  if (email) user.email = email;

  // re-hash if password is being changed
  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }

  await user.save();
  res.status(200).json({ user });
});

// DELETE /api/v1/auth/delete/:id — permanently removes a user
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");

  await user.deleteOne();
  res.status(200).json({ message: "User deleted successfully" });
});
