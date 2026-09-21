import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store/storeProvider";
import { userKeys } from "../keys";
import { API } from "@repo/api";

export const useUser = () => {
  const { userStore } = useStore();
  return useQuery({
    queryKey: userKeys.profile(),
    queryFn: async () => {
      try {
        const user = await API.auth.getCurrentUser();
        userStore.setUser(user);
        return user;
      } catch (error) {
        userStore.clearUser();
        throw error;
      }
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
