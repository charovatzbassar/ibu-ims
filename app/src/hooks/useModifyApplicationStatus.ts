import { useMutation } from "@tanstack/react-query";
import { queryClient, ApplicationsService } from "@/services";

const useModifyApplicationStatus = () => {
  return useMutation({
    mutationFn: (data: { applicationID: string; status: string }) => {
      return ApplicationsService.modifyApplicationStatus(
        data.applicationID,
        data.status
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });
    },
  });
};

export default useModifyApplicationStatus;
