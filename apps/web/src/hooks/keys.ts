export const userKeys = {
  all: ["user"] as const,
  profile: () => ["user", "profile"] as const,
};
export const avatarKeys = {
  all: ["avatar"] as const,
  detail: () => ["avatar", "current"] as const,
};
export const eventsKeys = {
  all: ["events"] as const,
  myEvents: () => [...eventsKeys.all, "my"] as const,
};