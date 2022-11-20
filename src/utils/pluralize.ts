export const pluralize = (number: number, words: string[]) => {
  const lastDigit = Number(String(number).split('').pop());

  if (10 < number && number < 20) return words[2];
  if (lastDigit === 1) return words[0];
  if (lastDigit < 5) return words[1];
  return words[2];
};
