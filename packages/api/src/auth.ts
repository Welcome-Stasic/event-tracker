import type { IUpdateUser, UserDto, UserProfile } from "@repo/types";
import apiClient from "./client";
import { endpoints } from "./endpoints";
import type { SignInCredentials } from "./types";

export const signIn = async (credentials: SignInCredentials): Promise<void> => {
  await apiClient.post(endpoints.account.signIn, credentials);
};

export const signOut = async (): Promise<void> => {
  await apiClient.get(endpoints.account.signOut);
};

export const getCurrentUser = async <TUser = UserProfile>(): Promise<TUser> => {
  const response = await apiClient.get<TUser>(endpoints.account.getCurrentUser);
  return response.data;
};

export const updateUser = async (userData: IUpdateUser): Promise<UserProfile> => {
  const response = await apiClient.put<UserProfile>(
    endpoints.account.updateAccount,
    userData,
  );
  return response.data;
};

export const changeAvatar = async (avatar: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", avatar, avatar.name);
  const response = await apiClient.put<string>(
    endpoints.account.changeAvatar,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
  return response.data;
};

export const getAvatar = async (): Promise<Blob> => {
  const response = await apiClient.get<Blob>(endpoints.account.getAvatar, {
    responseType: "blob",
  });
  return response.data;
};

export type AdminCurrentUser = UserDto;
