import { useQuery } from "@tanstack/react-query";
import { API } from "@repo/api";

export const useEventImage = (eventId: string | undefined, index: number) => {
  return useQuery({
    queryKey: ["eventImage", eventId, index],
    queryFn: async () => {
      try {
        if (!eventId) return null;
        const blob = await API.events.getEventImage(eventId, index);
        return blob ? URL.createObjectURL(blob) : null;
      } catch (error) {
        return null;
      }
    },
    enabled: !!eventId && index >= 1 && index <= 4,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
