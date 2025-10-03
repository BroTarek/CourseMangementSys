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

      await axios.post("https://httpbin.org/post", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1)
          );
          dispatch(updateProgress({ id: fileWithProgress.id, progress }));
        },
      });

      dispatch(markUploaded(fileWithProgress.id));
      console.log(`${fileWithProgress.file.name} uploaded successfully`);
    });

    await Promise.all(uploadPromises);
  }
);