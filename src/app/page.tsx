'use client'
import React from "react";
import { Provider } from "react-redux";

import { FileUpload } from "./Components/FileUpload";
import { store } from "@/app/redux/store"; // 👈 adjust the path to where your store is

export default function Home() {
  return (
    <Provider store={store}>
      <FileUpload />
    </Provider>
  );
}
