export const formatNumber = (value: number): string => {
  const formattedNumber = new Intl.NumberFormat('cs-CZ', {
    maximumFractionDigits: 0,
  }).format(value);

  return formattedNumber;
};
