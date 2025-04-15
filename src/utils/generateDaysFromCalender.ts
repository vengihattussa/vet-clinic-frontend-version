// export const generateDaysForCurrentMonth = () => {
//   const daysInMonth = [];
//   const now = new Date();
//   const currentYear = now.getFullYear();
//   const currentMonth = now.getMonth();

//   const date = new Date(currentYear, currentMonth, 1);

//   while (date.getMonth() === currentMonth) {
//     const shortDay = date.toLocaleDateString("en-US", {weekday: "short"});
//     daysInMonth.push({
//       day: shortDay === "Sun" ? " " : shortDay[0],
//       date: `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`, // Format MM-DD
//     });

//     date.setDate(date.getDate() + 1);
//   }

//   return daysInMonth;
// };

export const generateDaysForCurrentMonth = () => {
  const daysInMonth = [];
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  const date = new Date(currentYear, currentMonth, 1);

  while (date.getMonth() === currentMonth) {
    const shortDay = date.toLocaleDateString("en-US", {weekday: "short"});

    daysInMonth.push({
      day: shortDay === "Sun" ? " " : shortDay[0],
      date: `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`, // Format MM-DD
      fullDate: `${currentYear}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`, // Format YYYY-MM-DD
    });

    date.setDate(date.getDate() + 1);
  }

  return daysInMonth;
};
