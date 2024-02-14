import { useMutation } from "@tanstack/react-query";
import { ApplicationsService } from "@/services";
import { queryClient } from "@/utils";

const useModifyApplicationStatus = (listingID: string) => {
  return useMutation({
    mutationFn: (status: string) =>
      ApplicationsService.modifyApplicationStatus(listingID, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};

export default useModifyApplicationStatus;
