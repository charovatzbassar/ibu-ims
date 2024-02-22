import { useMutation } from "@tanstack/react-query";
import { InternshipReportsService } from "@/services";
import { queryClient } from "@/utils";

const useModifyInternshipReportStatus = () => {
  return useMutation({
    mutationFn: (data: { reportID: string; status: string }) =>
      InternshipReportsService.modifyInternshipReportStatus(
        data.reportID,
        data.status
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internship-report"] });
    },
  });
};

export default useModifyInternshipReportStatus;
