import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@repo/api";
import type { RegisterUserDto } from "@repo/types";
import { usersKeys } from "../keys";

export const useUserRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RegisterUserDto) => {
      await API.users.registerUser(payload);
    },

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: usersKeys.all,
      });
    },
  });
};
