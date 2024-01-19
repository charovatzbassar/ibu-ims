import { useMutation } from "@tanstack/react-query";
import { InternshipListingsService } from "@/services";
import { queryClient } from "@/utils";

const useEditInternshipListing = (id: string) => {
  return useMutation({
    mutationFn: () => InternshipListingsService.editInternshipListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internship-listings", id] });
    },
  });
};

export default useEditInternshipListing;
