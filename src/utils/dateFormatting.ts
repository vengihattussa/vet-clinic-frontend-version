export const formatDateForDisplay = (date: Date) => {
  if (!date) return "";
  const parsedDate = new Date(date);
  const mm = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const dd = String(parsedDate.getDate()).padStart(2, "0");
  const yy = String(parsedDate.getFullYear()).slice(-2);
  return `${mm}/${dd}/${yy}`;
};

export function formatDateToISO(date?: string): string {
  if (typeof date !== "string") {
    return "";
  }
  // eslint-disable-next-line no-unsafe-optional-chaining
  const [month, day, year] = date?.split("/")?.map(Number);

  // Ensure the year is in full format (e.g., 2021 instead of 21)
  const fullYear = year < 100 ? (year < 50 ? 2000 + year : 1900 + year) : year;

  const formattedDate = new Date(fullYear, month - 1, day); // Months are 0-indexed in JS Dates
  const isoYear = formattedDate.getFullYear();
  const isoMonth = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const isoDay = String(formattedDate.getDate()).padStart(2, "0");

  return `${isoYear}-${isoMonth}-${isoDay}`;
}
