import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/index.css";

import AppRoutes from "./Routes";
import setupAxios from "./library/setupAxios";
import axios from "@/library/http";

setupAxios(axios, store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>
);
