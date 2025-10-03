import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileMeta } from "./AssignmentTypes";
import { uploadFiles } from "./AssignmentThunk";

type FilesState = {
  items: FileMeta[];
  uploading: boolean;
};

const initialState: FilesState = {
  items: [],
  uploading: false,
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    addFiles: (state, action: PayloadAction<FileMeta[]>) => {
      state.items.push(...action.payload);
    },
    updateProgress: (
      state,
      action: PayloadAction<{ id: string; progress: number }>
    ) => {
      const file = state.items.find((f) => f.id === action.payload.id);
      if (file) file.progress = action.payload.progress;
    },
    // ✅ Now accepts both id and fileUrl
    markUploaded: (
      state,
      action: PayloadAction<{ id: string; fileUrl: string }>
    ) => {
      const file = state.items.find((f) => f.id === action.payload.id);
      if (file) {
        file.uploaded = true;
        file.fileUrl = action.payload.fileUrl;
      }
    },
    clearFiles: (state) => {
      state.items = [];
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((f) => f.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFiles.pending, (state) => {
        state.uploading = true;
      })
      .addCase(uploadFiles.fulfilled, (state) => {
        state.uploading = false;
      })
      .addCase(uploadFiles.rejected, (state) => {
        state.uploading = false;
      });
  },
});

export const { addFiles, updateProgress, markUploaded, clearFiles, removeFile } =
  filesSlice.actions;

export default filesSlice.reducer;
