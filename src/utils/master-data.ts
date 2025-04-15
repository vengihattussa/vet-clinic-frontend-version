import {allCountries} from "@src/constants/countryCodes";

export const countryCodeMap = (country: string) => {
  const foundCountry = allCountries.find(
    (item) => item.name.toLowerCase() == country.toLowerCase(),
  );
  return foundCountry?.dial_code ?? "";
};
