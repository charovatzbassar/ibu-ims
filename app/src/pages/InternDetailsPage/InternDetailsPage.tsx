import React from "react";
import { useIntern, useModifyInternshipReportStatus } from "@/hooks";
import { Navigate, useParams } from "react-router-dom";
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
import { SuccessAlert } from "@/components";

const InternDetailsPage = () => {
  const { internID } = useParams();

  const { data: intern, isPending } = useIntern(internID || "");

  const {
    mutate: modifyReportStatus,
    isSuccess,
    data,
  } = useModifyInternshipReportStatus();

  return (
    <>
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
                  Position: {intern?.internship.internship_listing?.position}
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
                  <Button variant="contained" color="success">
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
        </>
      )}
    </>
  );
};

export default InternDetailsPage;
