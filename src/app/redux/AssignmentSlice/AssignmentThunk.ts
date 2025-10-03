// uploadFiles.ts
'use client'

import { createAsyncThunk } from "@reduxjs/toolkit";
import { FileWithProgress } from "./AssignmentTypes";
import { updateProgress, markUploaded } from "./AssignmentSlice";
import axios from "axios";

// Thunk for uploading files
export const uploadFiles = createAsyncThunk(
  "assignment/uploadFiles",
  async (files: FileWithProgress[], { dispatch }) => {
    const uploadPromises = files.map(async (fileWithProgress) => {
      const formData = new FormData();
      formData.append("file", fileWithProgress.file);

      try {
        const response = await axios.post("/api/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? 1));
            dispatch(updateProgress({ id: fileWithProgress.id, progress }));
          },
        });
         console.log(response)
        // response.data.fileName should be returned by backend (e.g. "1759495118526-Linuxppt.pdf")
        const fileName = response.data.originalName;

        // Build public URL from Next.js /public/uploads folder
        const fileUrl = `${response.data.fileUrl}`;

        dispatch(
          markUploaded({
            id: fileWithProgress.id,
            fileUrl,
          })
        );
        console.log("Upload successful:", fileName)
        console.log("File accessible at:", fileUrl)
      } catch (error) {
        console.error("Upload failed:", error);
      }
    });

    await Promise.all(uploadPromises);
  }
);
