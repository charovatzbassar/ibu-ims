import { queryClient, InternshipsService } from "@/services";
import { useMutation } from "@tanstack/react-query";

const useCreateInternship = () => {
  return useMutation({
    mutationFn: (data: { listingID: string; interns: string[] }) =>
      InternshipsService.createInternship(data.listingID, data.interns),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["internships"] });
    },
  });
};

export default useCreateInternship;
