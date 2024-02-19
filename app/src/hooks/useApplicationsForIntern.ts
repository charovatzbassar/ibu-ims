import { ApplicationsService } from "@/services";
import { useQuery } from "@tanstack/react-query";

const useApplicationsForIntern = (status: string) => {
  return useQuery({
    queryKey: ["applications", status],
    queryFn: () => ApplicationsService.getApplicationsForIntern(status),
  });
};

export default useApplicationsForIntern;
