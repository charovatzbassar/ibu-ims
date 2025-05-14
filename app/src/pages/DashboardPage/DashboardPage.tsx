import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  InternDashboard,
  CompanyDashboard,
  ManagerDashboard,
  AdminDashboard,
} from "./components";

const Dashboard = (role: string) => {
  switch (role) {
    case "company":
      return <CompanyDashboard />;
    case "intern":
      return <InternDashboard />;
    case "manager":
      return <ManagerDashboard />;
    case "admin":
      return <AdminDashboard />;
  }
};

const DashboardPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return Dashboard(user?.role || "");
};

export default DashboardPage;
