export const containsOnlySpecialChars = (str: string) => {
  return /^[^a-zA-Z0-9]*$/.test(str);
};
