import { useMutation } from "@tanstack/react-query";
import { ApplicationsService } from "@/services";
import { queryClient } from "@/utils";

const useCreateApplication = () => {
  return useMutation({
    mutationFn: (listingID: string) =>
      ApplicationsService.createApplication(listingID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
  });
};

export default useCreateApplication;
