import { Course, Direction, Project, UserRole } from "./enums";

export const DIRECTION_LABELS: Record<Direction, string> = {
  0: "Frontend", 1: "Backend", 2: "UX/UI",
};
export const COURSE_LABELS: Record<Course, string> = {
  1: "1", 2: "2", 3: "3", 4: "4",
};
export const USER_ROLE_LABELS: Record<UserRole, string> = {
  0: "Студент", 1: "Ментор", 2: "Администратор",
};
export const PROJECT_OPTIONS: Project[] = [0, 1];
export const PROJECT_LABELS: Record<Project, string> = {
  0: "ПАЗЛ", 1: "КОД",
};