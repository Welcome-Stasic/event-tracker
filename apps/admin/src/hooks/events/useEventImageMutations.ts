import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@repo/api";

export const useAddEventImage = (eventId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ index, file }: { index: number; file: File }) =>
      API.events.addEventImage(eventId, index, file),
    onSuccess: (_, { index }) => {
      queryClient.invalidateQueries({
        queryKey: ["eventImage", eventId, index],
      });
    },
  });
};

export const useDeleteEventImage = (eventId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (index: number) => API.events.deleteEventImage(eventId, index),
    onSuccess: (_, index) => {
      queryClient.invalidateQueries({
        queryKey: ["eventImage", eventId, index],
      });
    },
  });
};
