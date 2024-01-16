import { useQuery } from "@tanstack/react-query";
import { CompaniesService } from "@/services";

const useInternshipListings = () => {
  return useQuery("companies", () => CompaniesService.getCompanies());
};

export default useInternshipListings;
