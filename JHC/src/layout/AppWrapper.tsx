import * as React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// import { store } from "@app/config/store";
import { ToastContainer, Zoom } from "react-toastify";
import { store } from "../configs/store";

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          draggable={false}
          // icon={false}
          transition={Zoom}
        />
        <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
}
