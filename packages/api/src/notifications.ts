import apiClient from "./client";
import { endpoints } from "./endpoints";

export const subscribeNotification = async (): Promise<void> => {
  await apiClient.put(endpoints.notifications.subscribe);
};

export const unsubscribeNotification = async (): Promise<void> => {
  await apiClient.put(endpoints.notifications.unsubscribe);
};
