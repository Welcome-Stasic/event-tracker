import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@repo/api";
import { eventsKeys } from "../keys";

export const useAddEventUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: API.events.addEventToUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: eventsKeys.all });
      await queryClient.invalidateQueries({ queryKey: eventsKeys.myEvents() });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
