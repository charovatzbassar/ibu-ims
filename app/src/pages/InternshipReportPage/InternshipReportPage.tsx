import React from "react";
import { InternshipReportForm } from "./components";
import { Navigate, useParams } from "react-router-dom";
import { useCreateInternshipFinalReport, useInternship } from "@/hooks";
import { CircularProgress } from "@mui/material";

const InternshipReportPage = () => {
  const { internshipID } = useParams();
  const { mutate, isSuccess } = useCreateInternshipFinalReport(
    internshipID || ""
  );
  const { data: internshipData, isPending: isInternshipPending } =
    useInternship(internshipID || "");

  return (
    <>
      {isSuccess && <Navigate to="/home/dashboard" />}
      {isInternshipPending && <CircularProgress />}
      {!isInternshipPending && (
        <InternshipReportForm
          onSubmit={(data: { finalReport: string }) => {
            mutate(data.finalReport);
          }}
          internFullName={`${internshipData?.intern?.firstName} ${internshipData?.intern?.lastName}`}
        />
      )}
    </>
  );
};

export default InternshipReportPage;
