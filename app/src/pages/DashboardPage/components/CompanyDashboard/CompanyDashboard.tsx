import { useInternshipListingsByCompany, useInternships } from "@/hooks";
import { Internships, MyListings } from "..";
import { Box } from "@mui/system";

const CompanyDashboard = () => {
  const { data: internships } = useInternships();
  const { data: listings } = useInternshipListingsByCompany();

  return (
    <Box>
      <Internships data={internships} />
      <MyListings data={listings} />
    </Box>
  );
};

export default CompanyDashboard;
