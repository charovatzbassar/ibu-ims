import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/utils";
import appAxios from "@/services/appAxios";

const useSIS = () => {
  return useMutation({
    mutationFn: (data: { grade: string }) => {
      return appAxios.post(`/sis`, data.grade);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["sis"],
      });
    },
    onError: () => {
      queryClient.invalidateQueries({
        queryKey: ["sis"],
      });
    },
  });
};

export default useSIS;
