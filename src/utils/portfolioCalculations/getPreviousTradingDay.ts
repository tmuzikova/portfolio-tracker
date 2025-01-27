type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const tradingDaysMap: { [key in DayOfWeek]: number } = {
  0: -2, // Sunday => Friday
  1: -3, // Monday => Friday
  2: -1, // Tuesday => Monday
  3: -1, // Wednesday => Tuesday
  4: -1, // Thursday => Wednesday
  5: -1, // Friday => Thursday
  6: -1, // Saturday => Friday
};

export const getPreviousTradingDay = () => {
  const date = new Date();

  const dayOfWeek = date.getDay() as DayOfWeek;

  date.setDate(date.getDate() + tradingDaysMap[dayOfWeek]);

  return date.toISOString().split('T')[0];
};
