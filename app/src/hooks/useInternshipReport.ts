import { InternshipReportsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useInternshipReport = (internshipID: string) => {
  return useQuery({
    queryKey: ["internship-report", internshipID],
    queryFn: () =>
      InternshipReportsService.getInternshipReport(internshipID),
  });
};

export default useInternshipReport;
