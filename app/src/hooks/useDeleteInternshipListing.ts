import { useMutation } from "@tanstack/react-query";
import { InternshipListingsService } from "@/services";
import { queryClient } from "@/utils";

const useDeleteInternshipListing = (id: string) => {
  return useMutation({
    mutationFn: () => InternshipListingsService.deleteInternshipListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internship-listings", id] });
    },
  });
};

export default useDeleteInternshipListing;
