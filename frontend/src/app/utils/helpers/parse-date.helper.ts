export const parseDateToString = (date: Date): string => {
  const year = date.getFullYear();

  const month = date.getMonth() + 1;
  const patchedMonth = month < 10 ? `0${month}` : month;

  const day = date.getDate();
  const patchedDay = day < 10 ? `0${day}` : day;

  return `${year}-${patchedMonth}-${patchedDay}`;
};

export const parseDateToUIString = (date: Date): string => {
  const year = date.getFullYear();

  const month = date.getMonth() + 1;
  const patchedMonth = month < 10 ? `0${month}` : month;

  const day = date.getDate();
  const patchedDay = day < 10 ? `0${day}` : day;

  return `${patchedDay}-${patchedMonth}-${year}`;
};
