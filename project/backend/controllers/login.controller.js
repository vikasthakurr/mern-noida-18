import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

// POST /api/v1/auth/login
// validates credentials, signs a JWT, and sets it as an HTTP-only cookie
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");

  // compare plain password against stored bcrypt hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid password");

  // sign JWT with user id — expires in 1 day
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  // set token as HTTP-only cookie so it's not accessible via JS (XSS protection)
  // secure: true ensures it's only sent over HTTPS
  // sameSite: strict prevents CSRF attacks
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
  });

  res.status(200).json({ user });
});

export default login;
