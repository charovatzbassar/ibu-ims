import React from "react";
import { InternshipReportForm } from "./components";
import { useParams } from "react-router-dom";
import { useCreateInternshipFinalReport } from "@/hooks";

const InternshipReportPage = () => {
  const { internshipID } = useParams();
  const { mutate } = useCreateInternshipFinalReport(internshipID || "");
  return (
    <>
      <InternshipReportForm
        onSubmit={(data: { finalReport: string }) => {
          mutate(data.finalReport);
        }}
      />
    </>
  );
};

export default InternshipReportPage;
