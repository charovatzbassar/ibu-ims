import { useMutation } from "@tanstack/react-query";
import { InternshipReportsService } from "@/services";
import { queryClient } from "@/utils";

const useCreateInternshipReport = (internshipID: string) => {
  return useMutation({
    mutationFn: (report: string) =>
      InternshipReportsService.createInternshipReport(internshipID, report),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internship-report"] });
    },
  });
};

export default useCreateInternshipReport;
