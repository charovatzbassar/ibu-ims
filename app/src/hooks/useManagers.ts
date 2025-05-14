import { useQuery } from "@tanstack/react-query";
import { ManagersService } from "@/services";

const useManagers = () => {
  return useQuery({
    queryKey: ["managers"],
    queryFn: ManagersService.getManagers,
  });
};

export default useManagers;
