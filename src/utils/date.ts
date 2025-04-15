import {z} from "zod";

export const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// export const today = formatDate(new Date());
const formatDateToday = (date: Date) => {
  return date.toLocaleDateString("en-GB"); // 'en-GB' gives dd/mm/yyyy format
};

export const today = formatDateToday(new Date());
export const formatedDate = (value: string) => {
  const dateParts = value.split("-");
  const formattedDate = `${dateParts[1]}/${dateParts[2]}/${dateParts[0].slice(-2)}`;
  return formattedDate;
};

export const dobSchema = () =>
  z.string().refine((value) => {
    const today = new Date();
    const dob = new Date(value);
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      return age - 1 >= 18;
    }
    return age >= 18;
  }, "Must be 18 years or older");

export const convertToTitleCase = (str?: string) => {
  if (!str) return;
  let result = str.replace(/_/g, " ");

  const words = result.split(" ");

  result = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return result;
};

// export const calculateAge = (dateOfBirth: string) => {
//   const today = new Date();
//   const birthDate = new Date(dateOfBirth);
//   let age = today.getFullYear() - birthDate.getFullYear();
//   const monthDifference = today.getMonth() - birthDate.getMonth();

//   // Check if the birth date has not occurred yet this year
//   if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
//     age--;
//   }

//   return age;
// };

// date.ts
export const calculateNumericalAge = (birthDate: Date): number => {
  const today = new Date();
  const diff = today.getTime() - birthDate.getTime();
  const years = diff / (1000 * 60 * 60 * 24 * 365.25); // Approximate years
  return years;
};

export function convertDecimalAge(age: number) {
  const years = Math.floor(age);
  const remainingMonths = (age - years) * 12;
  const months = Math.floor(remainingMonths);
  const remainingWeeks = (remainingMonths - months) * 4.345; // Approx. weeks in a month
  const weeks = Math.floor(remainingWeeks);
  const days = Math.round((remainingWeeks - weeks) * 7); // Convert remaining fraction to days

  return `${years}y ${months}m ${weeks}w ${days}d`;
}

export const calculateAge = (birthDate: Date) => {
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return `${years}y ${months}m ${days}d`;
};

export const formatDateToMMDDYY = (date: Date | string | null): string => {
  if (!date) return "";

  // Ensure date is a Date object
  const validDate = date instanceof Date ? date : new Date(date);

  if (isNaN(validDate.getTime())) return ""; // Invalid date check

  const [month, day, year] = [
    validDate.getMonth() + 1,
    validDate.getDate(),
    validDate.getFullYear().toString().slice(-2),
  ];

  return `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")}/${year}`;
};
