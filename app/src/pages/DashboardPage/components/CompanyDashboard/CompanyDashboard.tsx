import { useInternshipListingsByCompany, useInternships } from "@/hooks";
import { Internships, MyListings } from "..";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

const CompanyDashboard = () => {
  const { data: internships, isPending: isInternshipsPending } =
    useInternships();
  const { data: listings, isPending: isListingsPending } =
    useInternshipListingsByCompany();

  return (
    <Box>
      {isInternshipsPending ? (
        <CircularProgress />
      ) : (
        <Internships data={internships} />
      )}
      {isListingsPending ? (
        <CircularProgress />
      ) : (
        <MyListings data={listings} />
      )}
    </Box>
  );
};

export default CompanyDashboard;
