import { useQuery } from "@tanstack/react-query";
import { InternshipListingsService } from "@/services";

const useInternshipListings = () => {
  return useQuery({
    queryKey: ["internship-listings"],
    queryFn: InternshipListingsService.getInternshipListings,
  });
};

export default useInternshipListings;
