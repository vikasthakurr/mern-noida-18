import express from "express";
import cors from "cors";
import authController from "./controllers/auth.controller.js";
import orderController from "./controllers/order.controller.js";

const app = express();

// parse incoming JSON request bodies
app.use(express.json());

// parse URL-encoded form data (e.g. HTML forms)
app.use(express.urlencoded({ extended: true }));

// enable Cross-Origin Resource Sharing for all origins
// in production, replace with specific origin: cors({ origin: "https://yourdomain.com" })
app.use(cors());

// mount route handlers
app.use("/api/v1/auth", authController);
app.use("/api/v1/orders", orderController);

// global error handler — catches all errors forwarded via next(err)
// must have 4 parameters for Express to treat it as an error handler
app.use((err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
