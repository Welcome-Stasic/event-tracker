import type { Course, Direction, Project, UserRole } from "../enums";

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  name: string;
  surname: string;
  patronymic?: string;
  fullName: string;
  description?: string;
  telegramLink: string;
  portfolioLink: string;
  age?: number;
  directions?: Direction[];
  direction?: number;
  course?: Course | string;
  project?: Project;
  group?: string | null;
  phoneNumber?: string | null;
  phone?: string;
  skills?: string[];
  techStack?: string[];
  userRole?: UserRole;
  avatarUrl?: string;
  isSubscribedToNotifications?: boolean;
  website?: string;
  about?: string;
  birthDate?: string;
  university?: string;
  faculty?: string;
  graduationYear?: number;
  experience?: string;
  location?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    telegram?: string;
  };
}

export interface UserContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  isAuthenticated: boolean;
  fetchUserProfile: (userId: string) => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

export type UserTableRow = {
  id: string;
  fio: string;
  username: string;
  project: string;
  badges: string[];
  age: number | null;
  telegramLink: string;
};