import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@repo/api";
import { userKeys } from "../keys";
import { useStore } from "../../store/storeProvider";

export const useSignOut = () => {
  const queryClient = useQueryClient();
  const { userStore } = useStore();

  return useMutation({
    mutationFn: API.auth.signOut,
    onSuccess: async () => {
      userStore.clearUser();
      queryClient.removeQueries({ queryKey: userKeys.profile() });
      queryClient.cancelQueries({ queryKey: userKeys.all });
    },
    onError: (error) => {
      console.error(error);
      userStore.clearUser();
      queryClient.removeQueries({ queryKey: userKeys.profile() });
      queryClient.cancelQueries({ queryKey: userKeys.all });
    },
  });
};
