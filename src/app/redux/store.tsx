'use client'

import { configureStore } from "@reduxjs/toolkit";
import AssignmentsReducer from "@/app/redux/AssignmentSlice/AssignmentSlice"; // replace with your slice
import { useDispatch } from "react-redux";



export const store = configureStore({
   reducer: {
    Assignments: AssignmentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["files/addFiles"], // your slice action
        ignoredPaths: ["files.items"],      // your state path
      },
    }),
});


// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

