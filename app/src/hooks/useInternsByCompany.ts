import { InternsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useInternsByCompany = () => {
  return useQuery({
    queryKey: ["interns-by-company"],
    queryFn: () => InternsService.getInternsByCompany(),
  });
};

export default useInternsByCompany;
