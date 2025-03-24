import {
  useCreateInternshipDay,
  useInternshipDaysByDate,
  useInternshipForIntern,
} from "@/hooks";
import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ErrorAlert, FallbackCard, SuccessAlert } from "@/components";
import { InternshipDayForm } from "./components";
import React from "react";
import {
  Cancel,
  CheckCircleOutline,
  HourglassBottom,
} from "@mui/icons-material";
import { InternshipDay } from "@/services/types";

const MyInternshipPage = () => {
  const { data, isPending } = useInternshipForIntern();

  const {
    mutate,
    data: mutateData,
    isSuccess,
  } = useCreateInternshipDay(data?.internshipID || "");

  const today = new Date();

  const { data: internshipDays } = useInternshipDaysByDate(
    data?.internshipID || "",
    today.toISOString().split("T")[0]
  );

  const latestInternshipDay: InternshipDay | undefined =
    (internshipDays && internshipDays[internshipDays.length - 1]) || {};

  let content: string = "";
  let statusContent: React.ReactElement = <></>;

  const dayReportSubmitted: boolean =
    latestInternshipDay?.workdayDate === today.toISOString().split("T")[0];

  if (today < new Date(data?.internship_listing?.startDate)) {
    content = "Your internship has not started yet.";
  } else if (today > new Date(data?.internship_listing?.endDate)) {
    content = "Your internship has ended.";
  } else if (dayReportSubmitted) {
    content = `You have already submitted your day report for today. See you tomorrow!`;

    switch (latestInternshipDay?.status) {
      case "PENDING":
        statusContent = (
          <>
            <HourglassBottom color="warning" />
            <Typography sx={{ fontWeight: "bold", marginX: 1 }}>
              Pending approval for your day report.
            </Typography>
          </>
        );
        break;
      case "APPROVED":
        statusContent = (
          <>
            <CheckCircleOutline color="success" />
            <Typography sx={{ fontWeight: "bold", marginX: 1 }}>
              Your day report has been approved!
            </Typography>
          </>
        );
        break;

      case "REJECTED":
        statusContent = (
          <>
            <Cancel color="error" />
            <Typography sx={{ fontWeight: "bold", marginX: 1 }}>
              Your day report has been rejected. Please resubmit.
            </Typography>
          </>
        );
        break;
      default:
        break;
    }
  }

  return (
    <>
      {!mutateData?.response?.data.message && isSuccess && (
        <SuccessAlert content="Day submitted successfully. See you tomorrow!" />
      )}
      {mutateData && mutateData.response?.data.message && (
        <ErrorAlert message={mutateData.response.data.message} />
      )}
      {isPending && <CircularProgress />}
      {!data ? (
        <FallbackCard content="You have no ongoing internship" />
      ) : (
        <>
          <Card sx={{ marginY: "10px" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data?.internship_listing?.position}
              </Typography>
              <Divider />
              <Box sx={{ marginTop: "10px" }}>
                <Typography variant="body2" color="text.secondary">
                  Started at:{" "}
                  {new Date(data?.internship_listing?.startDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ends at:{" "}
                  {new Date(data?.internship_listing?.endDate).toLocaleDateString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          {dayReportSubmitted && (
            <Card
              sx={{
                padding: "20px",
                marginY: "10px",
                display: "flex",
              }}
            >
              {statusContent}
            </Card>
          )}
          {content && latestInternshipDay?.status !== "REJECTED" ? (
            <Card sx={{ padding: "20px", marginY: "10px" }}>{content}</Card>
          ) : (
            <InternshipDayForm
              onSubmit={(data) => {
                mutate(data?.description || "");
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default MyInternshipPage;
