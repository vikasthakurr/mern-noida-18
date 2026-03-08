import express from "express";
import nodemailer from "nodemailer";

const PORT = 3000;
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// console.log(nodemailer);
// transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vikaskumar20012001@gmail.com",
    pass: "replace with your password",
  },
});
const mailOptions = {
  from: "vikaskumar20012001@gmail.com",
  to: "prachikundu005@gmail.com",
  subject: "Welcome aboard!",
  text: "This is a test email sent from Node.js",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
