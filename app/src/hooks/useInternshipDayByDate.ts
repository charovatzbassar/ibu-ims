import { InternshipDaysService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useInternshipDayByDate = (internshipID: string, date: string) => {
  return useQuery({
    queryKey: ["internship-days"],
    queryFn: () =>
      InternshipDaysService.getInternshipDayByDate(internshipID, date),
  });
};

export default useInternshipDayByDate;
