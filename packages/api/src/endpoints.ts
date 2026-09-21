export const endpoints = {
  account: {
    getCurrentUser: "/Account/get-user",
    getAllUsers: "/Account/get-all-users",
    getUserById: (userId: string) => `/Account/get-user-by-id/${userId}`,
    register: "/Account/register",
    signIn: "/Account/sign-in",
    signOut: "/Account/sign-out",
    updateAccount: "/Account/update-account",
    updateUser: (userId: string) => `/Account/update-user/${userId}`,
    deleteUser: (userId: string) => `/Account/delete-user/${userId}`,
    addEventToUser: "/Account/add-event-to-user",
    removeEventFromUser: "/Account/remove-event-from-user",
    getUserEvents: "/Account/get-user-events",
    changeAvatar: "/Account/change-avatar",
    getAvatar: "/Account/get-avatar",
  },
  events: {
    get: "/events/get-events",
    getById: (eventId: string) => `/events/get-event/${eventId}`,
    create: "/events/create-event",
    update: (eventId: string) => `/events/update-event/${eventId}`,
    remove: (eventId: string) => `/events/delete-event/${eventId}`,
    addImage: (eventId: string, index: number) =>
      `/events/add-image/${eventId}/${index}`,
    getImage: (eventId: string, index: number) =>
      `/events/get-image/${eventId}/${index}`,
    deleteImage: (eventId: string, index: number) =>
      `/events/delete-last-image/${eventId}/${index}`,
  },
  notifications: {
    subscribe: "/subscribe-to-notifications",
    unsubscribe: "/unsubscribe-from-notifications",
  },
} as const;
