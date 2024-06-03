import { InternshipDaysService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useInternshipDaysByDate = (internshipID: string, date: string) => {
  return useQuery({
    queryKey: ["internship-days", date, internshipID],
    queryFn: () =>
      InternshipDaysService.getInternshipDaysByDate(internshipID, date),
  });
};

export default useInternshipDaysByDate;
