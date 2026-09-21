import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@repo/api";
import { userKeys } from "../keys";
import { useStore } from "../../store/storeProvider";
import type { UserProfile } from "@repo/types";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const { userStore } = useStore();

  return useMutation({
    mutationFn: API.auth.signIn,
    onSuccess: () => {
      queryClient.fetchQuery<UserProfile>({
        queryKey: userKeys.profile(),
        queryFn: API.auth.getCurrentUser
      })
      .then(user => userStore.setUser(user))
      .catch(err => console.error(err));
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
