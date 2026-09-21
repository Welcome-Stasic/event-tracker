export function toTranslit(text: string): string {
  const map: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sh",
    ы: "y",
    э: "e",
    ю: "yu",
    я: "ya",
    ъ: "j",
    ь: "j",
  };
  return text
    .split("")
    .map((char) => {
      const lowerChar = char.toLowerCase();
      const replacement = map[lowerChar];

      if (replacement === undefined) return char;

      if (replacement === "") return "";

      const UpCase = char !== lowerChar;

      if (UpCase) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      } else {
        return replacement;
      }
    })
    .join("");
}
