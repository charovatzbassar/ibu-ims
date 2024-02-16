import { useMutation } from "@tanstack/react-query";
import { InternshipDaysService } from "@/services";
import { queryClient } from "@/utils";

const useApproveAllInternshipDays = (internshipID: string) => {
  return useMutation({
    mutationFn: () =>
      InternshipDaysService.approveAllInternshipDays(internshipID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internship-days"] });
    },
  });
};

export default useApproveAllInternshipDays;
