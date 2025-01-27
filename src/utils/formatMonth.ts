export const formatMonth = (date: Date): string => {
  const month = date
    .toLocaleDateString('cs-CZ', { month: 'short' })
    .replace('.', '');
  return month.charAt(0).toUpperCase() + month.slice(1);
};
