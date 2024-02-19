import React from "react";
import { BarChart, PieChart } from "@mui/x-charts";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const DashboardPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return <>Dashboard</>;
};

export default DashboardPage;
