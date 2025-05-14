import { useMutation } from "@tanstack/react-query";
import { queryClient, InternshipDaysService } from "@/services";

const useModifyInternshipDayStatus = () => {
  return useMutation({
    mutationFn: (data: { dayID: string; status: string }) =>
      InternshipDaysService.modifyInternshipDayStatus(data.dayID, data.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internship-days"] });
    },
  });
};

export default useModifyInternshipDayStatus;
