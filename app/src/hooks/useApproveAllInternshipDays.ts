import { useMutation } from "@tanstack/react-query";
import { queryClient, InternshipDaysService } from "@/services";

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
