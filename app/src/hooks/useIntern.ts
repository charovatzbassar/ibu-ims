import { InternsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useIntern = (internID: string) => {
  return useQuery({
    queryKey: ["interns", internID],
    queryFn: () => InternsService.getIntern(internID),
  });
};

export default useIntern;
