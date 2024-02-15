import { useInternships } from "@/hooks";
import React from "react";

type Props = {};

const MyInternshipsPage = (props: Props) => {
  const { data } = useInternships();

  console.log(data);

  return <div>MyInternshipsPage</div>;
};

export default MyInternshipsPage;
