export const phoneFormatting = (phoneNumber: string) => {
  if (!!phoneNumber && phoneNumber !== "") {
    const paddedPhoneNumber = phoneNumber.padEnd(10, " ");
    const areaCode = paddedPhoneNumber.slice(0, 3);
    const firstPart = paddedPhoneNumber.slice(3, 6);
    const secondPart = paddedPhoneNumber.slice(6, 10);

    const formattedNumber = `(${areaCode}) ${firstPart} - ${secondPart}`;

    return formattedNumber;
  } else {
    return "-";
  }
};

export const formatPhoneNumber = (input: string | undefined): string => {
  if (!input) return "";
  const cleaned = input?.replace(/\D/g, "");
  const pattern = /(\d{0,3})(\d{0,3})(\d{0,4})/;
  const match = cleaned?.match(pattern);
  if (!match) return cleaned;
  let formattedNumber = "";
  if (match[1]) {
    formattedNumber += `(${match[1]}`;
  }
  if (match[2]) {
    formattedNumber += `) ${match[2]}`;
  }
  if (match[3]) {
    formattedNumber += ` - ${match[3]}`;
  }

  return formattedNumber.trim();
};
