import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileMeta } from "./AssignmentTypes";

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
    markUploaded: (state, action: PayloadAction<string>) => {
      const file = state.items.find((f) => f.id === action.payload);
      if (file) file.uploaded = true;
    },
    clearFiles: (state) => {
      state.items = [];
    },
    removeFile: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((f) => f.id !== action.payload);
    },
  },
});

export const { addFiles, updateProgress, markUploaded, clearFiles, removeFile } =
  filesSlice.actions;

export default filesSlice.reducer;
