import mongoose from "mongoose";

// User schema — stores account credentials, role, and optional avatar
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // enforces one account per email at DB level
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    // note: password is stored as a bcrypt hash, never plain text
  },
  role: {
    type: String,
    enum: ["user", "admin", "moderator"], // restrict to known roles
    default: "user",
  },
  avatar: {
    type: String,
    default: "", // Cloudinary secure_url stored here after upload
  },
});

const User = mongoose.model("User", userSchema);

export default User;
