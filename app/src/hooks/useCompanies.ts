import { useQuery } from "@tanstack/react-query";
import { CompaniesService } from "@/services";

const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: CompaniesService.getCompanies,
  });
};

export default useCompanies;
