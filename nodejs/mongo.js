import express from "express";
import mongoose from "mongoose";
// import bcyrpt from "bcryptjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors());
const PORT = 3000;
app.use(express.json());

//db connection

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });

//schema defination
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

//model
const User = mongoose.model("User", userSchema);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//crud
app.post("/api/users/register", async (req, res) => {
  //   const { email, password } = req.body;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ email, password: hashedPassword });
    const savedUser = await newUser.save();
    if (!savedUser)
      return res.status(400).json({ message: "user not created" });
    return res.status(201).json({ message: "user created" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
});

//read

//login
app.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid credentials" });

    //jwt token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      },
    );
    // if (!token) return res.status(400).json({ message: "token not generated" });
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   maxAge: 1000 * 60 * 60 * 24,
    // });
    // if (!res.cookie) {
    //   return;
    // }
    return res.status(200).json({ message: "login successfull", token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "internal server error" });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "access denied no token availble" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "invalid token" });
  }
};
app.get("/api/users/getusers", verifyToken, async (req, res) => {
  try {
    const users = await User.find();
    if (!users) return res.status(404).json({ message: "user not found" });
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
  }
});

//update
app.put("/api/users/update/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "user not found" });
    return res.status(200).json({ message: "user updated" });
  } catch (err) {
    console.log(err);
  }
});

//delete
app.delete("/api/users/delete/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "user not found" });
    return res.status(200).json({ message: "user deleted" });
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
