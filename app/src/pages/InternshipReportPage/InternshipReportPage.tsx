import { InternshipReportForm } from "./components";
import { Navigate, useParams } from "react-router-dom";
import { useCreateInternshipReport, useInternship } from "@/hooks";
import { CircularProgress } from "@mui/material";

const InternshipReportPage = () => {
  const { internshipID } = useParams();

  const { data: internshipData, isPending: isInternshipPending } =
    useInternship(internshipID || "");

  const { mutate: createReport, isSuccess } = useCreateInternshipReport(
    internshipID || ""
  );

  return (
    <>
      {isSuccess && <Navigate to="/home/dashboard?ended=true" />}
      {isInternshipPending && <CircularProgress />}
      {!isInternshipPending && (
        <InternshipReportForm
          onSubmit={(data: { finalReport?: string }) => {
            createReport(data.finalReport || "");
          }}
          internFullName={`${internshipData?.intern?.firstName} ${internshipData?.intern?.lastName}`}
        />
      )}
    </>
  );
};

export default InternshipReportPage;
