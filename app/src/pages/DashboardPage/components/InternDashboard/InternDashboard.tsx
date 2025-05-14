import { useApplicationsForIntern, useInternshipForIntern } from "@/hooks";
import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { MyInternship, ApprovedApplications } from "..";
import { AccessTime } from "@mui/icons-material";
import { IconText } from "@/components";

const InternDashboard = () => {
  const { data: internship, isPending: isInternshipPending } =
    useInternshipForIntern();

  const {
    data: approvedApplications,
    isPending: isApprovedApplicationsPending,
  } = useApplicationsForIntern("APPROVED");

  return (
    <Box>
      <IconText
        text={`Today's Date: ${new Date().toLocaleDateString()}`}
        icon={<AccessTime />}
      />
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
