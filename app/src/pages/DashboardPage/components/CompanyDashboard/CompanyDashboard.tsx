import { useInternshipListingsByCompany, useInternships } from "@/hooks";
import { Internships, MyListings } from "..";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { SuccessAlert } from "@/components";

const CompanyDashboard = () => {
  const [searchParams] = useSearchParams();
  const { data: internships, isPending: isInternshipsPending } =
    useInternships();
  const { data: listings, isPending: isListingsPending } =
    useInternshipListingsByCompany();

  return (
    <Box>
      {searchParams.get("deleted") && (
        <SuccessAlert content="Listing deleted successfully!" />
      )}
      {searchParams.get("ended") && (
        <SuccessAlert content="Internship ended successfully!" />
      )}
      {isInternshipsPending ? (
        <CircularProgress />
      ) : (
        <Internships data={internships} />
      )}
      {isListingsPending ? (
        <CircularProgress />
      ) : (
        <MyListings data={listings || []} />
      )}
    </Box>
  );
};

export default CompanyDashboard;
