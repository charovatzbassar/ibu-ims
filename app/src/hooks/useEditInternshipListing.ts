import { useMutation } from "@tanstack/react-query";
import { InternshipListingsService } from "@/services";
import { queryClient } from "@/utils";
import { InternshipListingFormValues } from "@/services/types";

const useEditInternshipListing = (id: string) => {
  return useMutation({
    mutationFn: (newData: InternshipListingFormValues) =>
      InternshipListingsService.editInternshipListing(id, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internship-listings", id] });
    },
  });
};

export default useEditInternshipListing;
