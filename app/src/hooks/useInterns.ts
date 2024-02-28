import { InternsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useInterns = () => {
  return useQuery({
    queryKey: ["interns"],
    queryFn: () => InternsService.getInterns(),
  });
};

export default useInterns;
