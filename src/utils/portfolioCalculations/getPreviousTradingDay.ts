export const getPreviousTradingDay = () => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0)
    date.setDate(date.getDate() - 2); // Sunday => Friday
  else if (dayOfWeek === 6)
    date.setDate(date.getDate() - 1); // Saturday => Friday
  else date.setDate(date.getDate() - 1); // regular weekday => Previous day
  return date.toISOString().split('T')[0];
};
