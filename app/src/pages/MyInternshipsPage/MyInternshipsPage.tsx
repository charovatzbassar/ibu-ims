import { useInternships } from "@/hooks";
import React from "react";
import { InternshipItem } from "./components";

type Props = {};

const MyInternshipsPage = (props: Props) => {
  const { data } = useInternships();

  return (
    <>
      <InternshipItem data={data} />
    </>
  );
};

export default MyInternshipsPage;
