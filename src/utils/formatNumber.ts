export const formatNumber = (
  value: number,
  fractionDigits: number = 0,
): string => {
  const formattedNumber = new Intl.NumberFormat('cs-CZ', {
    maximumFractionDigits: fractionDigits,
    minimumFractionDigits: fractionDigits,
  }).format(value);

  return formattedNumber.replace(',', '.');
};
