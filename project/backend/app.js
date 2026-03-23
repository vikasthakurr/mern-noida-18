import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authController from "./controllers/auth.controller.js";
import orderController from "./controllers/order.controller.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // must be before routes so req.cookies is populated

// credentials mode requires an explicit origin — wildcard "*" is rejected by browsers
// when withCredentials is true on the client side
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true, // allows cookies / auth headers to be sent cross-origin
}));

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
