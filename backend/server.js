const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const compression = require("compression");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(compression());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Connect DB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected".green.bold);
});

// Basic route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`.yellow.bold)
);
