import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../store/storeProvider";
import { eventsKeys } from "../keys";
import { API } from "@repo/api";

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const { eventsStore } = useStore();

  return useMutation({
    mutationFn: async (id: string) => {
      await API.events.deleteEventById(id);
      return id;
    },
    onSuccess: (id) => {
      eventsStore.deleteEvent?.(id);
      queryClient.invalidateQueries({ queryKey: eventsKeys.all });
      queryClient.removeQueries({ queryKey: eventsKeys.byId(id) });
    },
  });
};
