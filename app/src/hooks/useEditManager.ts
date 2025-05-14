import { useMutation } from "@tanstack/react-query";
import { queryClient, ManagersService } from "@/services";
import { ManagerFormValues } from "@/services/types";

const useEditManager = (id: string) => {
  return useMutation({
    mutationFn: (data: ManagerFormValues) =>
      ManagersService.editManager(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managers", { id }] });
    },
  });
};

export default useEditManager;
