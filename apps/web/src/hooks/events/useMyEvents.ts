import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store/storeProvider";
import { eventsKeys } from "../keys";
import { API } from "@repo/api";
import { mapEventType } from "@repo/types";

export const useMyEvents = () => {
  const { myEventsStore } = useStore();
  return useQuery({
    queryKey: eventsKeys.myEvents(),
    queryFn: async () => {
      const events = await API.events.getMyEvents();
      const mappedEvents = events.map(event => ({
        ...event,
        type: mapEventType(event.eventType)
      }));
      myEventsStore.loadMyEvents(mappedEvents);
      return mappedEvents;
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
