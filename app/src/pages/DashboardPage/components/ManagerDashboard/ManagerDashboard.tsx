import React from "react";
import { MyInternships } from "./components";
import { useInterns } from "@/hooks";

const ManagerDashboard = () => {
  const { data: interns } = useInterns("", "");

  return (
    <>
      <MyInternships interns={interns} />
    </>
  );
};

export default ManagerDashboard;
