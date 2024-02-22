import { useApplicationsForIntern, useInternshipForIntern } from "@/hooks";
import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { MyInternship, ApprovedApplications } from "..";

const InternDashboard = () => {
  const { data: internship, isPending: isInternshipPending } =
    useInternshipForIntern();

  const {
    data: approvedApplications,
    isPending: isApprovedApplicationsPending,
  } = useApplicationsForIntern("APPROVED");

  return (
    <Box>
      <Typography sx={{ fontSize: 25, marginY: "10px" }}>
        Today's Date: {new Date().toDateString()}
      </Typography>
      {isInternshipPending ? (
        <CircularProgress />
      ) : (
        <MyInternship data={internship} />
      )}
      {isApprovedApplicationsPending ? (
        <CircularProgress />
      ) : (
        <ApprovedApplications data={approvedApplications} />
      )}
    </Box>
  );
};

export default InternDashboard;
