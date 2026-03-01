// import http from "http";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.set("view engine", "ejs");



// app.use(express.static(distPath));
//server

const PORT = 3000;
// const app = http.createServer((req, res) => {
//   //   res.statusCode = 200;
//   //   res.setHeader("author", "vikas");
//   //   res.setHeader("datatype", "text/plain");
//   //   res.end("hello world");
//   //   console.log(req.statusCode);
//   //   console.log(res.getHeaders);
//   if (req.url == "/about") {
//     res.end("hello from about page");
//   } else if (req.url == "/contact") {
//     res.end("hii from contact");
//   } else {
//     res.end("imvalid route");
//   }
// });

// app.get("/", (req, res) => {
//   //   res.end("hi from home page");
//   res.status(200).json({ message: "hi from home page" });
//   //   if (err) return res.status(404).json({ message: err.message });
// });
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/products", (req, res) => {
  fs.readFile("./products.json", "utf-8", (err, data) => {
    if (err) return res.status(404).json({ message: "error reading file" });
    res.status(200).json(data);
  });
});
app.get("/about", (req, res) => {
  fs.readFile("./about.html", "utf-8", (err, data) => {
    if (!data) return res.status(404).json({ err: err.message });

    res.status(200).send(data);
  });
});

app.listen(PORT, () => {
  console.log("server started");
});
