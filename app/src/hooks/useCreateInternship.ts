import { InternshipsService } from "@/services";
import { queryClient } from "@/utils";
import { useMutation } from "@tanstack/react-query";

const useCreateInternship = () => {
  return useMutation({
    mutationFn: (data: {
      listingID: string;
      companyID: string;
      interns: string[];
    }) => InternshipsService.createInternship(data.listingID, data.companyID, data.interns),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internships"] });
    },
  });
};

export default useCreateInternship;
