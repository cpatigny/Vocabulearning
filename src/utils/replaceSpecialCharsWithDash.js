import { removeAccents } from './removeAccents';

const replaceSpecialCharsWithDash = str => {
  // we remove accents first to avoid letters with accent being replaced by a dash
  const strWithoutAccents = removeAccents(str);
  return strWithoutAccents.replace(/[^a-zA-Z0-9]/g, '-');
};

export default replaceSpecialCharsWithDash;
