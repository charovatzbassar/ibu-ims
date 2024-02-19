import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "@/store";

type Props = { roles: string[] };

const RoleRoute: React.FC<Props> = (props) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return props.roles.some((role) => role === user.role) ? (
    <Outlet />
  ) : (
    <Navigate to="/home/dashboard" />
  );
};

export default RoleRoute;
