import { useCreateInternshipDay, useInternshipForIntern } from "@/hooks";
import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { ErrorAlert, SuccessAlert } from "@/components";
import { InternshipDayForm } from "./components";

const MyInternshipPage = () => {
  const { data, isPending } = useInternshipForIntern();

  const {
    mutate,
    data: mutateData,
    isSuccess,
  } = useCreateInternshipDay(data?.internshipID || "");

  const today = new Date();
  let content = "";

  if (today < new Date(data?.internship_listing.startDate)) {
    content = "Your internship has not started yet.";
  } else if (today > new Date(data?.internship_listing.endDate)) {
    content = "Your internship has ended.";
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
      {!data && (
        <Card sx={{ padding: "10px" }}>You have no ongoing internship.</Card>
      )}
      {data && (
        <>
          <Card sx={{ marginY: "10px" }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.internship_listing.position}
              </Typography>
              <Divider />
              <Box sx={{ marginTop: "10px" }}>
                <Typography variant="body2" color="text.secondary">
                  Started at:{" "}
                  {new Date(data.internship_listing.startDate).toDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ends at:{" "}
                  {new Date(data.internship_listing.endDate).toDateString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          {content ? (
            <Card sx={{ padding: "20px", marginY: "10px" }}>{content}</Card>
          ) : (
            <InternshipDayForm
              onSubmit={(data) => {
                mutate(data.description);
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default MyInternshipPage;
