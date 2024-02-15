import { InternshipsService } from "@/services";
import { queryClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

const useCreateInternshipFinalReport = (internshipID: string) => {
  return useMutation({
    mutationFn: (finalReport: string) =>
      InternshipsService.createInternshipFinalReport(internshipID, finalReport),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internships"] });
    },
  });
};

export default useCreateInternshipFinalReport;
