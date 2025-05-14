import { useQuery } from "@tanstack/react-query";
import { ManagersService } from "@/services";

const useManager = (id: string) => {
  return useQuery({
    queryKey: ["managers", { id }],
    queryFn: () => ManagersService.getManager(id),
  });
};

export default useManager;
