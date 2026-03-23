import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// verifies JWT from httpOnly cookie (set on login)
// falls back to Authorization: Bearer header for flexibility
const verifyToken = (req, res, next) => {
  // primary: read from httpOnly cookie
  let token = req.cookies?.token;

  // fallback: Authorization header
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, iat, exp }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default verifyToken;
