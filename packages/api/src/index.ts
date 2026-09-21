import * as auth from "./auth";
import * as events from "./events";
import * as notifications from "./notifications";
import * as users from "./users";

export { apiClient } from "./client";
export { endpoints } from "./endpoints";
export type { ApiResponse, SignInCredentials } from "./types";

export const API = {
  auth,
  events,
  notification: notifications,
  users,
};
