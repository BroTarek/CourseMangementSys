import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import uploadRoutes from "./routes/upload.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/upload", uploadRoutes);
const MONGO_URI='mongodb+srv://MohamedTarek:XvIrQ3xVVZ92xWlx@cluster0.1mxt3.mongodb.net/myApp?retryWrites=true&w=majority&appName=Cluster0'
// Connect to MongoDB Atlas
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    app.listen(process.env.PORT, () =>
      console.log(`🚀 Server running on http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
