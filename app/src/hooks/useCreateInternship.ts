import { InternshipsService } from "@/services";
import { queryClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

const useCreateInternship = () => {
  return useMutation({
    mutationFn: (data: {
      companyID: string;
      internID: string;
    }) => InternshipsService.createInternship(data.companyID, data.internID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internships"] });
    },
  });
};

export default useCreateInternship;
