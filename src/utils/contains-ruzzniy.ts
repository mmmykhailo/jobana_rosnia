const jobanaruzznia =
  /йобан([а-яієї]{1,2}).*(р|ₚ|\.)(у|о)сн([а-яієї]{1,2})|(р|ₚ|\.)(у|о)сн([а-яієї]{1,2}).*йобан([а-яієї]{1,2})/;

export const containsruzzniu = (text: string) => {
  return Boolean(text.toLocaleLowerCase().match(jobanaruzznia));
};
