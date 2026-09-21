import type { Course, Direction, Project, UserRole } from "../enums";

export interface UserDto {
  id: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  patronymic?: string | null;
  description?: string | null;
  telegramLink: string;
  portfolioLink: string;
  isSubscribedToNotifications?: boolean;
  age: number | null;
  directions: Direction[];
  course: Course;
  project: Project;
  group: string | null;
  phoneNumber?: string | null;
  skills: string[];
  userRole: UserRole;
  avatarUrl?: string | null;
}

export interface RegisterUserDto {
  username: string;
  email: string;
  password: string;
  name: string;
  surname: string;
  patronymic?: string;
  description?: string;
  telegramLink: string;
  portfolioLink: string;
  isSubscribedToNotifications?: boolean;
  age?: number | null;
  directions?: Direction[];
  project?: Project;
  course?: Course;
  group?: string | null;
  phoneNumber?: string | null;
  skills?: string[];
}

export interface IUpdateUser {
  id: string;
  username?: string;
  email?: string;
  name?: string;
  surname?: string;
  patronymic?: string;
  description?: string;
  telegramLink?: string;
  portfolioLink?: string;
  isSubscribedToNotifications?: boolean;
  age?: number;
  direction?: number;
  directions?: Direction[];
  course?: number | Course;
  skills?: string[];
  userRole?: UserRole;
  avatarUrl?: string;
}