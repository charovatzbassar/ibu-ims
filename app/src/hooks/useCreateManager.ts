import { useMutation } from "@tanstack/react-query";
import { queryClient, ManagersService } from "@/services";
import { ManagerFormValues } from "@/services/types";

const useCreateManager = () => {
  return useMutation({
    mutationFn: (data: ManagerFormValues) =>
      ManagersService.createManager(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managers"] });
    },
  });
};

export default useCreateManager;
