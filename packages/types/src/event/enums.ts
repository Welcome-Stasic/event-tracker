export const eventTypeMap: Record<number, string> = {
  0: "События",
  1: "Конкурс",
  2: "Олимпиада",
  3: "Стажировка",
  4: "Вакансия",
};

type eventType = number | undefined;

export const mapEventType = (type: eventType): string => {
  if (type === undefined) return "События";
  return eventTypeMap[type] || "События";
};