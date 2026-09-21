import { useQuery } from "@tanstack/react-query";
import { API } from "@repo/api";

export const useEventImage = (eventId: string | undefined, index: number) => {
  return useQuery({
    queryKey: ["eventImage", eventId, index],
    queryFn: () => {
        if (!eventId) return null;
        return API.events.getEventImage(eventId, index).then(blob => blob ? URL.createObjectURL(blob) : null);
    },
    enabled: !!eventId && index >= 1 && index <= 4,
    staleTime: 1000 * 60 * 5,
  });
};
