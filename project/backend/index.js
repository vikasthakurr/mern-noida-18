import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authController from "./controllers/auth.controller.js";

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//mongo db connection coming from config file
connectDB();

//middleware routes

app.use("/api/v1/auth", authController);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
