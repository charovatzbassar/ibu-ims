import React from "react";
import { InternshipReportForm } from "./components";
import { Navigate, useParams } from "react-router-dom";
import { useCreateInternshipFinalReport } from "@/hooks";

const InternshipReportPage = () => {
  const { internshipID } = useParams();
  const { mutate, isSuccess } = useCreateInternshipFinalReport(
    internshipID || ""
  );
  return (
    <>
      {isSuccess && <Navigate to="/home/dashboard" />}
      <InternshipReportForm
        onSubmit={(data: { finalReport: string }) => {
          mutate(data.finalReport);
        }}
      />
    </>
  );
};

export default InternshipReportPage;
