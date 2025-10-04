import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import File from "../models/File.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const CLOUDINARY_CLOUD_NAME="dmlsdri4l"
const CLOUDINARY_API_KEY="961752819272573"
const CLOUDINARY_API_SECRET="yOQWsdXYAdIEGZEU8347wq00Yf0"

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key:    CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// Helper for uploading buffer streams
const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "assignments", resource_type: "auto" },
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};

// POST: Upload file to Cloudinary + Save metadata in MongoDB
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const result = await streamUpload(req.file.buffer);

    const newFile = new File({
      originalName: req.file.originalname,
      fileUrl: result.secure_url,
      public_id: result.public_id,
    });

    await newFile.save();

    res.json({
      success: true,
      fileUrl: result.secure_url,
      originalName: req.file.originalname,
      public_id: result.public_id,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, error: "Upload failed" });
  }
});

// GET: Fetch all uploaded files from DB
router.get("/", async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.json(files);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ success: false, error: "Could not fetch files" });
  }
});

export default router;
