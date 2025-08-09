import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const userinfo = localStorage.getItem("userInfo");
  return userinfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
