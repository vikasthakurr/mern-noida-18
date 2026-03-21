import rateLimit from "express-rate-limit";

// helper to build a consistent error response shape
const message = (action) => ({
  success: false,
  message: `Too many ${action} attempts. Please try again later.`,
});

// strict limiter — 10 req / 15 min
// applied to sensitive auth routes (login, register) to prevent brute force & spam
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: message("login"),
});

export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: message("registration"),
});

// moderate limiter — 20 req / 15 min
// applied to write operations that shouldn't be hammered
export const updateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: message("update"),
});

export const createOrderLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: message("order creation"),
});

// loose limiter — 50 req / 15 min
// applied to read routes to prevent scraping while allowing normal usage
export const getAllUsersLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: message("user listing"),
});

export const getOrdersLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: message("order listing"),
});
