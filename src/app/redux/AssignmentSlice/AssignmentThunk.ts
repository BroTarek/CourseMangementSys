'use client'

import { createAsyncThunk } from "@reduxjs/toolkit";
import { FileWithProgress } from "./AssignmentTypes";
import { updateProgress, markUploaded } from "./AssignmentSlice";
import axios from "axios";

// Thunk for uploading files to Express + Cloudinary
export const uploadFiles = createAsyncThunk(
  "assignment/uploadFiles",
  async (files: FileWithProgress[], { dispatch }) => {
    const uploadPromises = files.map(async (fileWithProgress) => {
      const formData = new FormData();
      formData.append("file", fileWithProgress.file);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/upload",   // ✅ Express backend
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (progressEvent) => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total ?? 1)
              );
              dispatch(updateProgress({ id: fileWithProgress.id, progress }));
            },
          }
        );

        // Cloudinary + MongoDB response
        const { fileUrl, originalName, public_id } = response.data;

        // ✅ Store in Redux
        dispatch(
          markUploaded({
            id: fileWithProgress.id,
            fileUrl,
            originalName,
            public_id,
          })
        );

        console.log("✅ Upload successful:", originalName);
        console.log("🌐 File accessible at:", fileUrl);
      } catch (error) {
        console.error("❌ Upload failed:", error);
      }
    });

    await Promise.all(uploadPromises);
  }
);
