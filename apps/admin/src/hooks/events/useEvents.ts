import { useQuery } from "@tanstack/react-query";
import { useStore } from "../../store/storeProvider";
import { eventsKeys } from "../keys";
import { API } from "@repo/api";
import { mapEventType } from "@repo/types";

export const useEvents = () => {
  const { eventsStore } = useStore();
  return useQuery({
    queryKey: eventsKeys.all,
    queryFn: async () => {
        const events = await API.events.getEvents();
        const mappedEvents = events.map(e => ({
            ...e,
            type: mapEventType(e.eventType)
        }));
      eventsStore.loadEvents(mappedEvents);
      return mappedEvents;
    },
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: false,
  });
};
