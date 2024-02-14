import { useMutation } from "@tanstack/react-query";
import { ApplicationsService } from "@/services";
import { queryClient } from "@/utils";

const useModifyApplicationStatus = () => {
  return useMutation({
    mutationFn: (data: { applicationID: string; status: string }) =>
      ApplicationsService.modifyApplicationStatus(
        data.applicationID,
        data.status
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};

export default useModifyApplicationStatus;
