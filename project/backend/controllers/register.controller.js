import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

// POST /api/v1/auth/register
// creates a new user account with optional avatar upload
const register = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  // check if email is already registered
  const alreadyExisted = await User.findOne({ email });
  if (alreadyExisted) throw new ApiError(400, "User already exists");

  // hash password before storing — salt rounds = 10 is a good balance of security vs speed
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // upload avatar to Cloudinary if a file was provided
  // multer saves it temporarily to /uploads, cloudinary util deletes it after upload
  let avatarUrl = "";
  if (req.file) {
    const uploaded = await uploadOnCloudinary(req.file.path);
    if (uploaded) avatarUrl = uploaded.secure_url;
  }

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    avatar: avatarUrl,
    role, // defaults to "user" if not provided (enforced by schema)
  });

  res.status(201).json({ user });
});

export default register;
