import express from "express";
import fs from "fs";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.set("view engine", "ejs");

// const app = express();
app.use(express.json());

const PORT = 3000;

// app.use((req, res, next) => {
//   console.log("middleware 1 called");
//   next();
// });

// app.use((req, res, next) => {
//   console.log("middleware 2 called");
//   next();
// });
let username = "prachi123";
let password = "1234";
// let role = "admin";
app.use((req, res, next) => {
  if (req.body.username === username) {
    next();
  } else {
    res.status(402).json({ err: "unauthorized usename" });
  }
});

app.use((req, res, next) => {
  if (req.body.password === password) {
    next();
  } else {
    res.status(404).json({ err: "invalid password" });
  }
});

app.use((req, res, next) => {
  if (req.body.role === "admin") {
    next();
  } else {
    res.status(404).json({ message: "role is not matching" });
  }
});

app.use((req, res, next) => {
  fs.appendFile(
    "./entry.txt",
    `\nuser login success at ${Date.now()}`,
    (err) => {
      if (err) return res.status(400).json({ err: err.message });
    },
  );
  next();
});
app.get("/", (req, res, next, err) => {
  res.send("hello world");
});


// /api/v2/feature/login
//api/auth/v1/login
app.post("/login", (req, res) => {
  //   res.send("login");
  //   console.log(req.body);
  //   res
  //     .status(201)
  //     .json({ message: "login successfull and welcome to admin dashboard" });
  res.render("dashboard");
});

app.listen(PORT, () => {
  console.log("server started");
});
