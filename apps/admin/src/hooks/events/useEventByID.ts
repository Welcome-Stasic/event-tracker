import { useQuery } from "@tanstack/react-query";
import { eventsKeys } from "../keys";
import { API } from "@repo/api";
import { mapEventType } from "@repo/types";

export const useEventById = (id: string) => {
  return useQuery({
    queryKey: eventsKeys.byId(id),
    queryFn: async () => {
      const event = await API.events.getEventsById(id);
      const mappedEvent = {
        ...event,
        type: mapEventType(event.eventType),
      };
      return mappedEvent;
    },
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
