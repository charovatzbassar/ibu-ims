import { InternshipsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useInternships = () => {
  return useQuery({
    queryKey: ["internships"],
    queryFn: () => InternshipsService.getInternships(),
  });
};

export default useInternships;
