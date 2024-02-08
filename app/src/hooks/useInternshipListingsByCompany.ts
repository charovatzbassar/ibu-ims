import { useQuery } from "@tanstack/react-query";
import { InternshipListingsService } from "@/services";

const useInternshipListingsByCompany = () => {
  return useQuery({
    queryKey: ["internship-listings-by-company"],
    queryFn: () => InternshipListingsService.getInternshipListingsByCompany(),
  });
};

export default useInternshipListingsByCompany;
