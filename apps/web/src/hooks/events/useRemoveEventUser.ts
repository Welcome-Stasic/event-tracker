import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@repo/api";
import { eventsKeys } from "../keys";

export const useRemoveEventUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.events.removmeEventById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: eventsKeys.myEvents() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
