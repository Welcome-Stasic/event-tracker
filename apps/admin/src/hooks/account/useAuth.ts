import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@repo/api";
import { userKeys } from "../keys";
import { useStore } from "../../store/storeProvider";
import type { UserDto } from "@repo/types";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { managerStore } = useStore();

  return useMutation({
    mutationFn: API.auth.signIn,
    onSuccess: async () => {
      try {
        const user = await queryClient.fetchQuery<UserDto>({
          queryKey: userKeys.profile(),
          queryFn: API.auth.getCurrentUser,
        });
        if (user.userRole !== 0 && user.userRole !== 1) {
          await API.auth.signOut();
          throw new Error("Обнаружен шпион");
        }
        managerStore.setUser(user);
      } catch (error) {
        console.error(error);
      }
    },
    onError: (error) => {
      throw error;
    },
  });
};
