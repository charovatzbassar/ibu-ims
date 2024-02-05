import { useMutation } from "@tanstack/react-query";
import { InternshipListingsService } from "@/services";
import { queryClient } from "@/utils";
import { InternshipListingFormValues } from "@/services/types";

const useCreateInternshipListing = () => {
  return useMutation({
    mutationFn: (data: InternshipListingFormValues) =>
      InternshipListingsService.createInternshipListing(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internship-listings"] });
    },
  });
};

export default useCreateInternshipListing;
