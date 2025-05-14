import { useMutation } from "@tanstack/react-query";
import { queryClient, InternshipListingsService } from "@/services";

const useDeleteInternshipListing = (id: string) => {
  return useMutation({
    mutationFn: () => InternshipListingsService.deleteInternshipListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internship-listings", id] });
    },
  });
};

export default useDeleteInternshipListing;
