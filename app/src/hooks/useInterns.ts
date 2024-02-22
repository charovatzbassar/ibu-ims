import { InternsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useInterns = (searchTerm: string, searchStatus: string) => {
  return useQuery({
    queryKey: ["interns", searchTerm, searchStatus],
    queryFn: () => InternsService.getInterns(searchTerm, searchStatus),
  });
};

export default useInterns;
