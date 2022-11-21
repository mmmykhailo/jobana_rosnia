const jobanaRegex =
  /йобан([а-яієї]{1,2}).*(р|ₚ|\.)(у|о)сн([а-яієї]{1,2})|(р|ₚ|\.)(у|о)сн([а-яієї]{1,2}).*йобан([а-яієї]{1,2})/;

export const containsJobana = (text: string) => {
  return Boolean(text.toLocaleLowerCase().match(jobanaRegex));
};
