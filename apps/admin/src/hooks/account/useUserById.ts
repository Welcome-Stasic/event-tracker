import { useQuery } from "@tanstack/react-query";
import { API } from "@repo/api";
import { usersKeys } from "../keys";
import type { UserDto } from "@repo/types";

export const useUserById = (
  userId: string | null,
  enabled = true
) => {
  return useQuery<UserDto>({
    queryKey: userId ? usersKeys.byId(userId) : ["user", "empty"],
    queryFn: async () => {
      const user = await API.users.getUserById(userId as string);
      return user;
    },
    enabled: enabled && !!userId,
  });
};
