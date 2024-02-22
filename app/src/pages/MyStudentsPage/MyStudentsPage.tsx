import { useInterns } from "@/hooks";
import React from "react";

const MyStudentsPage = () => {
  const { data } = useInterns();

  console.log(data);

  return <div>MyStudentsPage</div>;
};

export default MyStudentsPage;
