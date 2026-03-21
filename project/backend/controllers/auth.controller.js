import express from "express";
import upload from "../config/multer.config.js";
import verifyToken from "../middleware/auth.middleware.js";
import { loginLimiter, registerLimiter, updateLimiter, getAllUsersLimiter } from "../config/rateLimit.config.js";

import register from "./register.controller.js";
import login from "./login.controller.js";
import { getAllUsers, updateUser, deleteUser } from "./users.controller.js";

const authController = express.Router();

// POST /api/v1/auth/register — public, rate limited, accepts avatar file upload
authController.post("/register", registerLimiter, upload.single("avatar"), register);

// POST /api/v1/auth/login — public, rate limited
authController.post("/login", loginLimiter, login);

// GET /api/v1/auth/allusers — protected, rate limited
authController.get("/allusers", getAllUsersLimiter, verifyToken, getAllUsers);

// PUT /api/v1/auth/update/:id — protected, rate limited
authController.put("/update/:id", updateLimiter, verifyToken, updateUser);

// DELETE /api/v1/auth/delete/:id — protected
authController.delete("/delete/:id", verifyToken, deleteUser);

export default authController;
