import type { EventItem, FormValues } from "@repo/types";
import apiClient from "./client";
import { endpoints } from "./endpoints";

export const getEvents = async (): Promise<EventItem[]> => {
  const response = await apiClient.get<EventItem[]>(endpoints.events.get);
  return response.data;
};

export const getEventsById = async (id: string): Promise<EventItem> => {
  const response = await apiClient.get<EventItem>(endpoints.events.getById(id));
  return response.data;
};

export const changeEventById = async (id: string, data: EventItem): Promise<EventItem> => {
  await apiClient.put(endpoints.events.update(id), data);
  return data;
};

export const createEvent = async (data: FormValues): Promise<EventItem> => {
  const response = await apiClient.post<EventItem>(endpoints.events.create, data);
  return response.data;
};

export const deleteEventById = async (id: string): Promise<void> => {
  await apiClient.delete(endpoints.events.remove(id));
};

export const addEventImage = async (eventId: string, index: number, file: File): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);
  await apiClient.post(endpoints.events.addImage(eventId, index), formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getEventImage = async (eventId: string, index: number): Promise<Blob | null> => {
  const response = await apiClient.get<Blob>(endpoints.events.getImage(eventId, index), {
    responseType: "blob",
    validateStatus: (status) => status < 500,
  });
  return response.status === 404 ? null : response.data;
};

export const deleteEventImage = async (eventId: string, index: number): Promise<void> => {
  await apiClient.delete(endpoints.events.deleteImage(eventId, index));
};

export const addEventToUser = async (id: string): Promise<void> => {
  await apiClient.put(endpoints.account.addEventToUser, id);
};

export const getMyEvents = async (): Promise<EventItem[]> => {
  const response = await apiClient.get<EventItem[]>(endpoints.account.getUserEvents);
  return response.data;
};

export const removmeEventById = async (id: string): Promise<void> => {
  await apiClient.put(endpoints.account.removeEventFromUser, id);
};
