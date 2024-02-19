import { InternshipsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useInternshipForIntern = () => {
  return useQuery({
    queryKey: ["internship-for-intern"],
    queryFn: () => InternshipsService.getInternshipForIntern(),
  });
};

export default useInternshipForIntern;
