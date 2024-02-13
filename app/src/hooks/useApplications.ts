import { useQuery } from "@tanstack/react-query";
import { ApplicationsService } from "@/services";

const useApplications = (listingID: string) => {
  return useQuery({
    queryKey: ["applications"],
    queryFn: () => ApplicationsService.getApplications(listingID),
  });
};

export default useApplications;
