import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store/storeProvider";
import { userKeys } from "../keys";
import { API } from "@repo/api";
import type { UserDto } from "@repo/types";

export const useUser = () => {
  const { managerStore } = useStore();
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: async () => {
      try {
        const user = await API.auth.getCurrentUser<UserDto>();
        managerStore.setUser(user);
        return user;
      } catch (error) {
        managerStore.clearUser();
        throw error;
      }
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
