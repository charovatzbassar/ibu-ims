import React from "react";
import { useIntern, useModifyInternshipReportStatus, useSIS } from "@/hooks";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { Days, FinalReport } from "./components";
import { ConfirmModal, ErrorAlert, SuccessAlert } from "@/components";

const InternDetailsPage = () => {
  const [open, setOpen] = React.useState<boolean>(false);

  const { internID } = useParams();

  const {
    mutate: enterGrade,
    isSuccess: gradeEnteredSuccessfully,
    isError: gradeEnteredError,
  } = useSIS();

  const { data: intern, isPending } = useIntern(internID || "");

  const {
    mutate: modifyReportStatus,
    isSuccess,
    data,
  } = useModifyInternshipReportStatus();

  return (
    <>
      {gradeEnteredSuccessfully && <SuccessAlert content="Grade entered!" />}
      {gradeEnteredError && (
        <ErrorAlert message="Grade could not be entered!" />
      )}
      {isSuccess && !data.response?.data?.error && (
        <SuccessAlert content="Internship ended!" />
      )}
      {isPending && <CircularProgress />}
      {intern && !isPending && (
        <>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {intern?.firstName} {intern?.lastName}
              </Typography>
              <Divider />
              <Box sx={{ marginY: "10px" }}>
                <Typography variant="body2" color="text.secondary">
                  Company: {intern?.internship?.company?.companyName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Position: {intern?.internship?.internship_listing?.position}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  Start Date:{" "}
                  {new Date(
                    intern?.internship?.internship_listing?.startDate
                  ).toDateString()}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  End Date:{" "}
                  {new Date(
                    intern?.internship?.internship_listing?.endDate
                  ).toDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Status:{" "}
                  {intern?.internship?.status[0] +
                    intern?.internship?.status.slice(1).toLowerCase()}
                </Typography>
              </Box>
              <Divider />
              {intern?.internship?.final_grade?.grade && (
                <Box
                  sx={{
                    marginY: "10px",
                  }}
                >
                  <Typography sx={{ marginY: "10px" }}>
                    Grade: {intern?.internship?.final_grade?.grade}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => setOpen(true)}
                  >
                    migrate to sis
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>

          <Days days={intern?.internship?.internship_day || []} />

          {!intern?.internship?.final_grade?.grade && (
            <FinalReport
              modifyReportStatus={modifyReportStatus}
              report={intern?.internship?.internship_report}
            />
          )}

          <ConfirmModal
            onClick={() => {
              setOpen(false);
              enterGrade({
                grade: intern?.internship?.final_grade?.grade || "",
              });
            }}
            modalOpen={open}
            closeModal={() => setOpen(false)}
            buttonColor="success"
          >
            <Typography sx={{ marginY: "10px" }}>
              Are you sure you want to enter this grade into Student Information
              System?
            </Typography>
          </ConfirmModal>
        </>
      )}
    </>
  );
};

export default InternDetailsPage;
