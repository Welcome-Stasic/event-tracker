import { useQuery } from "@tanstack/react-query";
import { avatarKeys } from "../keys";
import { API } from "@repo/api";

export const useGetAvatar = () => {
  return useQuery({
    queryKey: avatarKeys.detail(),
    queryFn: API.auth.getAvatar,
    staleTime: 300000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
