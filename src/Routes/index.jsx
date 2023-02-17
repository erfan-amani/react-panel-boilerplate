import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Admin from "@/layouts/Admin";
import Auth from "@/layouts/Auth";
import Dashboard from "@/views/admin/Dashboard";
import { adminRoutes } from "./admin.routes";
import { authRoutes } from "./auth.routes";
import { useSelector } from "react-redux";

const RecursiveRoute = ({ path, component: Element, children = [] }) => {
  return (
    <>
      {!!children?.length ? (
        children.map((data) => <RecursiveRoute {...data} />)
      ) : (
        <Route key={path} path={path} element={Element} />
      )}
    </>
  );
};

const AppRoutes = () => {
  const isAuth = useSelector((state) => !!state.auth.accessToken);

  return (
    <BrowserRouter>
      <Routes>
        {isAuth && (
          <Route path="admin" element={<Admin />}>
            {adminRoutes.map(
              ({ path, component: Element, children = [], breadcrumbs }) => (
                <Route
                  key={path}
                  path={path}
                  element={<Element breadcrumbs={breadcrumbs} />}
                >
                  {children.length &&
                    children.map(({ path, component: Element }) => (
                      <Route key={path} path={path} element={<Element />} />
                    ))}
                </Route>
              )
            )}
          </Route>
        )}

        {!isAuth && (
          <Route exact path="auth" element={<Auth />}>
            {authRoutes.map(({ path, component: Element }) => (
              <Route key={path} path={path} element={<Element />} />
            ))}
            <Route path="/auth" render={() => <Navigate to="/auth/login" />} />
          </Route>
        )}

        <Route
          path="*"
          element={
            <Navigate to={isAuth ? "/admin/dashboard" : "/auth/login"} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
