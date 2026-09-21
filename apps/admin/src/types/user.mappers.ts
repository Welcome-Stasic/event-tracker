import {
  COURSE_LABELS,
  DIRECTION_LABELS,
  PROJECT_LABELS,
  type RegisterUserDto,
  type UserDto,
  type UserFormValues,
  type UserTableRow,
} from "@repo/types";

const capitalize = (value: string) =>
  value.trim()
    ? value.trim().charAt(0).toUpperCase() + value.trim().slice(1).toLowerCase()
    : "";

const normalizePersonField = (value: string) => capitalize(value);

export const getUserFio = (user: UserDto): string =>
  [user.surname, user.name, user.patronymic]
    .filter((value): value is string => Boolean(value))
    .map(capitalize)
    .join(" ");

export const mapUserToTableRow = (user: UserDto): UserTableRow => {
  const directions = user.directions ?? [];
  const courseLabel = COURSE_LABELS[user.course] ?? `${user.course} курс`;

  const badges =
    directions.length > 0
      ? directions.map(
          (direction) => `${DIRECTION_LABELS[direction]} ${courseLabel}`,
        )
      : [`Не указано ${courseLabel}`];

  return {
    id: user.id,
    fio: getUserFio(user),
    username: user.username,
    project: PROJECT_LABELS[user.project] ?? "—",
    badges,
    age: user.age ?? null,
    telegramLink: user.telegramLink,
  };
};

export const mapUserToFormValues = (user: UserDto): UserFormValues => ({
  username: user.username,
  email: user.email,
  password: "",
  name: user.name,
  surname: user.surname,
  patronymic: user.patronymic ?? "",
  description: user.description ?? "",
  telegramLink: user.telegramLink,
  portfolioLink: user.portfolioLink,
  isSubscribedToNotifications: user.isSubscribedToNotifications ?? false,
  age: user.age ?? null,
  directions: user.directions ?? [],
  course: user.course,
  project: user.project,
  skills: user.skills ?? [],
  userRole: user.userRole,
  avatarUrl: user.avatarUrl ?? "",
});

export const mapFormValuesToUserDto = (
  form: UserFormValues,
  userId: string,
): UserDto => ({
  id: userId,
  username: form.username,
  email: form.email,
  name: normalizePersonField(form.name),
  surname: normalizePersonField(form.surname),
  patronymic: normalizePersonField(form.patronymic) || null,
  description: form.description || null,
  telegramLink: form.telegramLink,
  portfolioLink: form.portfolioLink,
  isSubscribedToNotifications: form.isSubscribedToNotifications,
  group: null,
  age: form.age,
  directions: form.directions,
  course: form.course,
  project: form.project,
  skills: form.skills,
  userRole: form.userRole,
  avatarUrl: form.avatarUrl || null,
});

export const mapFormValuesToRegisterUserDto = (
  form: UserFormValues,
): RegisterUserDto => ({
  username: form.username,
  email: form.email,
  password: form.password,
  name: normalizePersonField(form.name),
  surname: normalizePersonField(form.surname),
  patronymic: normalizePersonField(form.patronymic),
  description: form.description,
  telegramLink: form.telegramLink,
  portfolioLink: form.portfolioLink,
  isSubscribedToNotifications: form.isSubscribedToNotifications,
  age: form.age,
  directions: form.directions,
  course: form.course,
  project: form.project,
  skills: form.skills,
});
