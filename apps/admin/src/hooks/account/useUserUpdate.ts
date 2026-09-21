import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@repo/api";
import { usersKeys } from "../keys";
import type { UserDto } from "@repo/types";

export const useUserUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      data,
    }: {
      userId: string;
      data: UserDto;
    }) => {
      console.log("mutationFn updateUser", { userId, data });
      await API.users.updateUser(userId, data);
    },

    onSuccess: (_, variables) => {
      console.log("update success", variables.userId);

      queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: usersKeys.byId(variables.userId),
      });
    },

    onError: (error) => {
      console.log("update error", error);
    },
  });
};
