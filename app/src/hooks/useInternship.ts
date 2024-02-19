import { InternshipsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useInternship = (internshipID: string) => {
  return useQuery({
    queryKey: ["internship", internshipID],
    queryFn: () => InternshipsService.getInternship(internshipID),
  });
};

export default useInternship;
