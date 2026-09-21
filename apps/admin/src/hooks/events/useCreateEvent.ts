import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useStore } from "../../store/storeProvider";
import { eventsKeys } from "../keys";
import { API } from "@repo/api";
import { mapEventType, type FormValues } from "@repo/types";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const { eventsStore } = useStore();

  return useMutation({
    mutationFn: async (data: FormValues) => {
      const newEvent = await API.events.createEvent(data);
      const mappedEvent = {
        ...newEvent,
        type: mapEventType(newEvent.eventType),
      };
      return mappedEvent;
    },
    onSuccess: (event) => {
      eventsStore.addEvent?.(event);
      queryClient.invalidateQueries({ queryKey: eventsKeys.all });
    },
  });
};
