import { useMutation } from "@tanstack/react-query";
import { InternshipDaysService } from "@/services";
import { queryClient } from "@/utils";

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
