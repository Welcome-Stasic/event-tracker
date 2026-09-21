import type { EventType } from "../enums";

export const eventTypeMap: Record<number, string> = {
  0: "События",
  1: "Конкурс",
  2: "Олимпиада",
  3: "Стажировка",
  4: "Вакансия",
};

export const mapEventType = (type: EventType | undefined): string => {
  if (type === undefined) return "События";
  return eventTypeMap[type] || "События";
};