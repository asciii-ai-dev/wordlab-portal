import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Plans from "../pages/Plans";
import Dashboard from "../pages/dashboard/Dashboard";
import ResetPass from "../pages/auth/ResetPass";

const Login = lazy(() => import("../pages/auth/Login"));
const SignUp = lazy(() => import("../pages/auth/Signup"));

const AuthRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        exact
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/signup"
        exact
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <SignUp />
          </Suspense>
        }
      />
      <Route
        path="/resetpass/:token"
        exact
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <ResetPass />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <Login />
          </Suspense>
        }
      />
      
    </Routes>
  );
};

export default AuthRoutes;
