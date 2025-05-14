import { useMutation } from "@tanstack/react-query";
import { queryClient, CompaniesService } from "@/services";

const useChangeCompanyStatus = (id: string) => {
  return useMutation({
    mutationFn: (status: string) =>
      CompaniesService.changeCompanyStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};

export default useChangeCompanyStatus;
