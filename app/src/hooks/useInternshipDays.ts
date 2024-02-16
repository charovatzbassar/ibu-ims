import { InternshipDaysService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useInternshipDays = (internshipID: string) => {
  return useQuery({
    queryKey: ["internship-days"],
    queryFn: () => InternshipDaysService.getInternshipDays(internshipID),
  });
};

export default useInternshipDays;
