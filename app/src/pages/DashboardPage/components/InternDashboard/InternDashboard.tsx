import { useApplicationsForIntern, useInternshipForIntern } from "@/hooks";
import { Card, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { MyInternship, ApprovedApplications } from "..";
import { AccessTime } from "@mui/icons-material";

const InternDashboard = () => {
  const { data: internship, isPending: isInternshipPending } =
    useInternshipForIntern();

  const {
    data: approvedApplications,
    isPending: isApprovedApplicationsPending,
  } = useApplicationsForIntern("APPROVED");

  return (
    <Box>
      <Card
        sx={{
          paddingX: "20px",
          paddingY: "10px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <AccessTime />
        <Typography sx={{ fontSize: 25, marginY: "10px" }}>
          Today's Date: {new Date().toLocaleDateString()}
        </Typography>
      </Card>
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
