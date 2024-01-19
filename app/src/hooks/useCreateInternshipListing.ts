import { useMutation } from "@tanstack/react-query";
import { InternshipListingsService } from "@/services";
import { queryClient } from "@/utils";

const useCreateInternshipListing = () => {
  return useMutation({
    mutationFn: () => InternshipListingsService.createInternshipListing(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internship-listings"] });
    },
  });
};

export default useCreateInternshipListing;
