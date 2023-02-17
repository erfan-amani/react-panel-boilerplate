import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import authImg from "@/assets/img/register_bg_2.png";
import { authRoutes } from "../Routes/auth.routes";

export default function Auth() {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage: "url(" + authImg + ")",
            }}
          ></div>
          <Routes>
            {authRoutes.map(({ path, component: Element }) => (
              <Route key={path} path={path} exact element={<Element />} />
            ))}
            <Route path="/auth" render={() => <Navigate to="/auth/login" />} />
          </Routes>
        </section>
      </main>
    </>
  );
}
