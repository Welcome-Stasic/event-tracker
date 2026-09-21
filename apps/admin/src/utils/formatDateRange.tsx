export const formatDateRange = (start: string, end: string): string => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) return "";

  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];

  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const startMonth = months[startDate.getMonth()];
  const endMonth = months[endDate.getMonth()];
  if (startDate.toDateString() === endDate.toDateString()) {
    return `${startDay} ${startMonth}`;
  }
  if (startDate.getMonth() === endDate.getMonth()) {
    return `с ${startDay} по ${endDay} ${endMonth}`;
  }
  return `с ${startDay} ${startMonth} по ${endDay} ${endMonth}`;
};
