import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// verifies the JWT token from the Authorization header
// expected format: "Authorization: Bearer <token>"
// attaches decoded payload to req.user so downstream handlers can access user info
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // reject if header is missing or not in Bearer format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // extract token after "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, iat, exp }
    next();
  } catch (err) {
    // token is expired or tampered
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default verifyToken;
