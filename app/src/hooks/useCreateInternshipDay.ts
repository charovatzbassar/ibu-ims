import { useMutation } from "@tanstack/react-query";
import { queryClient, InternshipDaysService } from "@/services";

const useCreateInternshipListing = (internshipID: string) => {
  return useMutation({
    mutationFn: (description: string) =>
      InternshipDaysService.createInternshipDay(internshipID, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internship-days"] });
    },
  });
};

export default useCreateInternshipListing;
