import { InternsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useInterns = (status: string) => {
  return useQuery({
    queryKey: ["interns"],
    queryFn: () => InternsService.getInterns(status),
  });
};

export default useInterns;
