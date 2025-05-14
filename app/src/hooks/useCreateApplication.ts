import { useMutation } from "@tanstack/react-query";
import { queryClient, ApplicationsService } from "@/services";

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
