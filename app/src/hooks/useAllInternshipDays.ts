import { useQuery } from "@tanstack/react-query";
import { InternshipDaysService } from "@/services";

const useAllInternshipDays = (internshipID: string) => {
  return useQuery({
    queryKey: ["internship-days", internshipID],
    queryFn: () => InternshipDaysService.getAllInternshipDays(internshipID),
  });
};

export default useAllInternshipDays;
