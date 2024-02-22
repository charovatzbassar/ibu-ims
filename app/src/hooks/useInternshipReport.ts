import { InternshipReportsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useInternshipReport = (internshipID: string, internID: string) => {
  return useQuery({
    queryKey: ["internship-report", internshipID, internID],
    queryFn: () =>
      InternshipReportsService.getInternshipReport(internshipID, internID),
  });
};

export default useInternshipReport;
