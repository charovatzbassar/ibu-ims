import { useMutation } from "@tanstack/react-query";
import { queryClient, CompaniesService } from "@/services";
import { CompanyFormValues } from "@/services/types";

const useEditCompany = (id: string) => {
  return useMutation({
    mutationFn: (data: CompanyFormValues) =>
      CompaniesService.editCompany(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};

export default useEditCompany;
