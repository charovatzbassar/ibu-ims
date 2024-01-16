import { useQuery } from "@tanstack/react-query";
import { InternshipListingsService } from "@/services";

const useInternshipListings = () => {
  return useQuery("internship-listings", () =>
    InternshipListingsService.getInternshipListings()
  );
};

export default useInternshipListings;
