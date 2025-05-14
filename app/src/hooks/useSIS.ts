import { useMutation } from "@tanstack/react-query";
import { queryClient, appAxios } from "@/services/";

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
