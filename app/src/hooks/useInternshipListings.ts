import { useQuery } from "@tanstack/react-query";
import { InternshipListingsService } from "@/services";

const useInternshipListings = (searchTerm: string) => {
  return useQuery({
    queryKey: ["internship-listings", searchTerm],
    queryFn: () => InternshipListingsService.getInternshipListings(searchTerm),
  });
};

export default useInternshipListings;
