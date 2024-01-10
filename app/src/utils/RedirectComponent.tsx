import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";

const RedirectComponent = (): React.ReactElement => {
  const [searchParams, setSearchParams] = useSearchParams();

  if (searchParams.has("token")) {
    localStorage.setItem("token", searchParams.get("token")!);
  }

  return <Navigate to="/home/dashboard" />;
};

export default RedirectComponent;
