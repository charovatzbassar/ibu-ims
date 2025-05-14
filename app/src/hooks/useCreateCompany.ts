import { useMutation } from "@tanstack/react-query";
import { queryClient, CompaniesService } from "@/services";
import { CompanyFormValues } from "@/services/types";

const useCreateCompany = () => {
  return useMutation({
    mutationFn: (data: CompanyFormValues) =>
      CompaniesService.createCompany(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
  });
};

export default useCreateCompany;
