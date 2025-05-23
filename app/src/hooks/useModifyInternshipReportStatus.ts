import { useMutation } from "@tanstack/react-query";
import { queryClient, InternshipReportsService } from "@/services";

const useModifyInternshipReportStatus = () => {
  return useMutation({
    mutationFn: (data: { reportID: string; status: string; grade: number }) =>
      InternshipReportsService.modifyInternshipReportStatus(
        data.reportID,
        data.status,
        data.grade
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internship-report"] });
      queryClient.invalidateQueries({ queryKey: ["interns"] });
    },
  });
};

export default useModifyInternshipReportStatus;
