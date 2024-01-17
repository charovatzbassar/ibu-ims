import { useQuery } from "@tanstack/react-query";
import { InternshipListingsService } from "@/services";

const useInternshipListing = (id: string) => {
  return useQuery({
    queryKey: ["internship-listings", { id }],
    queryFn: () => InternshipListingsService.getInternshipListing(id),
  });
};

export default useInternshipListing;
