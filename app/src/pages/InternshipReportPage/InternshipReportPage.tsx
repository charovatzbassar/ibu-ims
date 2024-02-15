import React from "react";
import { InternshipReportForm } from "./components";

const InternshipReportPage = () => {
  return (
    <>
      <InternshipReportForm
        onSubmit={(data: { finalReport: string }) => {
          console.log(data);
        }}
      />
    </>
  );
};

export default InternshipReportPage;
