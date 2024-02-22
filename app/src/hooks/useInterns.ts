import { InternsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useInterns = (searchTerm: string) => {
  return useQuery({
    queryKey: ["interns", searchTerm],
    queryFn: () => InternsService.getInterns(searchTerm),
  });
};

export default useInterns;
