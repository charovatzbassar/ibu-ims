import { useMutation } from "@tanstack/react-query";
import { queryClient, ManagersService } from "@/services";

const useChangeManagerStatus = () => {
  return useMutation({
    mutationFn: (data: { id: string; status: string }) =>
      ManagersService.changeManagerStatus(data.id, data.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["managers"] });
    },
  });
};

export default useChangeManagerStatus;
