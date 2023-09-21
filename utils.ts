export const raise = (message: string) => {
  throw new Error(message);
};

export const jobanaRegex =
  /йобан([а-яієї]{1,2}).*(р|ₚ|\.)(у|о)сн([а-яієї]{1,2})|(р|ₚ|\.)(у|о)сн([а-яієї]{1,2}).*йобан([а-яієї]{1,2})/;

export const triggers = (message: string) => {
  return Boolean(message.toLocaleLowerCase().match(jobanaRegex));
};

export const isPrime = (number: number) => {
  if (number <= 1) return false;
  if (number <= 3) return true;
  if (number % 2 == 0 || number % 3 == 0) return false;

  for (let i = 5; i * i <= number; i = i + 6) {
    if (number % i == 0 || number % (i + 2) == 0) return false;
  }

  return true;
};

export const pluralize = (number: number, words: string[]) => {
  const lastDigit = Number(String(number).split("").pop());

  if (10 < number && number < 20) return words[2];
  if (lastDigit === 1) return words[0];
  if (1 < lastDigit && lastDigit < 5) return words[1];
  return words[2];
};
