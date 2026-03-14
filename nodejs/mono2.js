import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = 3000;
mongoose
  .connect("mongodb+srv://mwnsishrwn:mwn123@mern12.cahg9m4.mongodb.net/")

  .then(() => {
    console.log("Connected to MongoDB");
  })

  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
