export const isValidEuTaxId = (id = '') => {
  const startsWithCountryCode = /^[a-z]{2}/i.test(id); // or lang code for Greece
  const hasValidLength = id.length >= 7 && id.length <= 15; // UK health and government is the shortest

  return hasValidLength && startsWithCountryCode;
};
