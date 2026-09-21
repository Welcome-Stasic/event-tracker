export const getTimeToStart = (targetDate: string): string => {
  if (!targetDate) return "";

  const target = new Date(targetDate);
  const now = new Date();

  if (isNaN(target.getTime())) return "";

  const difference = target.getTime() - now.getTime();
  if (difference <= 0) return "Событие началось";

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const pluralize = (num: number, words: [string, string, string]): string => {
    const n = Math.abs(num) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return words[2];
    if (n1 > 1 && n1 < 5) return words[1];
    if (n1 === 1) return words[0];
    return words[2];
  };
  if (days > 0) {
    const dayWord = pluralize(days, ["день", "дня", "дней"]);
    return `${days} ${dayWord}`;
  }
  if (hours > 0) {
    const hourWord = pluralize(hours, ["час", "часа", "часов"]);
    const minuteWord = pluralize(minutes, ["минута", "минуты", "минут"]);
    return `${hours} ${hourWord} ${minutes} ${minuteWord}`;
  }
  const minuteWord = pluralize(minutes, ["минута", "минуты", "минут"]);
  return `${minutes} ${minuteWord}`;
};
