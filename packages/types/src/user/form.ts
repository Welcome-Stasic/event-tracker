import type { Course, Direction, Project, UserRole } from "../enums";

export type UserFormValues = {
  username: string;
  email: string;
  name: string;
  surname: string;
  patronymic: string;
  password: string;
  description: string;
  telegramLink: string;
  portfolioLink: string;
  isSubscribedToNotifications: boolean;
  age: number | null;
  directions: Direction[];
  course: Course;
  project: Project;
  skills: string[];
  userRole: UserRole;
  avatarUrl: string;
};

export type UsersFilters = {
  projects: Project[];
  courses: Course[];
  directions: Direction[];
};

export type RequiredUserField =
  | "username"
  | "email"
  | "password"
  | "name"
  | "surname"
  | "portfolioLink"
  | "telegramLink";

export type UserFormErrors = Partial<Record<RequiredUserField, string>>;