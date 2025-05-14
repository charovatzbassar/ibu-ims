import { useMutation } from "@tanstack/react-query";
import { queryClient, InternshipReportsService } from "@/services";

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
