// dotenv must be configured before any other imports
// so that process.env variables are available throughout the app
import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.config.js";

// connect to MongoDB before starting the server
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
