import { useQuery } from "@tanstack/react-query";
import { ApplicationsService } from "@/services";

const useApplications = (listingID: string, status: string) => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: () => ApplicationsService.getApplications(listingID, status),
  });
};

export default useApplications;
