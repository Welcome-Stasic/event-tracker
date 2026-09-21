import type { RegisterUserDto, UserDto } from "@repo/types";
import apiClient from "./client";
import { endpoints } from "./endpoints";

export const getAllUsers = async (): Promise<UserDto[]> => {
  const response = await apiClient.get<UserDto[]>(endpoints.account.getAllUsers);
  return response.data;
};

export const getUserById = async (userId: string): Promise<UserDto> => {
  const response = await apiClient.get<UserDto>(endpoints.account.getUserById(userId));
  return response.data;
};

export const updateUser = async (userId: string, data: UserDto): Promise<void> => {
  await apiClient.put(endpoints.account.updateUser(userId), data);
};

export const registerUser = async (payload: RegisterUserDto): Promise<void> => {
  await apiClient.post(endpoints.account.register, payload);
};

export const deleteUserById = async (userId: string): Promise<void> => {
  await apiClient.delete(endpoints.account.deleteUser(userId));
};
