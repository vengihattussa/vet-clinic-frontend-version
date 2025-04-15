// utils/getCountryOptions.ts
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

export const getCountryOptions = (): Record<string, string> => {
  const countryNames = countries.getNames("en", {select: "official"});
  return Object.entries(countryNames).reduce(
    (acc, [code, name]) => {
      acc[code] = name;
      return acc;
    },
    {} as Record<string, string>,
  );
};
