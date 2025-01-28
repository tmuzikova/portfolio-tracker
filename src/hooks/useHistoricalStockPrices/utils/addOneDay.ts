export const addOneDay = (date: string) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay.toISOString().split('T')[0];
};
