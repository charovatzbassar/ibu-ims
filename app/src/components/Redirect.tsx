import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Redirect = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  localStorage.setItem("token", token || "");
  
  return <Navigate to="/" />;
};

export default Redirect;
