import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import AdminNavbar from "@/components/Navbars/AdminNavbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import HeaderStats from "@/components/Headers/HeaderStats";
import { adminRoutes } from "../Routes/admin.routes";
import { useUser } from "../hooks/useUser";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export default function Admin() {
  useUser();
  const fullSidebar = useSelector((state) => state.setting.fullSidebar);

  return (
    <>
      <ToastContainer />

      <Sidebar />
      <div
        className={`relative ${
          fullSidebar ? "md:ml-64" : "md:ml-sidebar"
        } bg-blueGray-100`}
      >
        <AdminNavbar />

        <div className="mx-auto w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
}
