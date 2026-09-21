import { useQuery } from "@tanstack/react-query";
import { API } from "@repo/api";
import { usersKeys } from "../keys";
import type { UserDto } from "@repo/types";

export const useUsers = () => {
  return useQuery<UserDto[]>({
    queryKey: usersKeys.all,
    queryFn: async () => {
      const users = await API.users.getAllUsers();
      return users;
    },
  });
};
