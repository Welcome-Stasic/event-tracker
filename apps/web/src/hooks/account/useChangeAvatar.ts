import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@repo/api";
import { avatarKeys } from "../keys";

export const useChangeAvatar = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => API.auth.changeAvatar(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: avatarKeys.detail() });
    },
  });
};
