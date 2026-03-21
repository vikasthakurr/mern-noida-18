import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // MONGO_URI must be set in .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    // exit process on connection failure — app cannot run without DB
    process.exit(1);
  }
};

export default connectDB;
