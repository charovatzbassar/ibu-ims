import { useQuery } from "@tanstack/react-query";
import { CompaniesService } from "@/services";

const useCompany = (id: string) => {
  return useQuery({
    queryKey: ["companies", { id }],
    queryFn: () => CompaniesService.getCompany(id),
  });
};

export default useCompany;
