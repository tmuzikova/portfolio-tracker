import { TimeRange } from '../components/StockCard';

export const formatXAxisTick = (
  dateStr: string,
  index: number,
  range: TimeRange,
) => {
  const date = new Date(dateStr);

  if (index === 0) return '';

  switch (range) {
    case '5R':
      return date.getFullYear().toString();
    case '1R':
    case 'YTD':
      const formattedMonth = date
        .toLocaleDateString('cs-CZ', { month: 'short' })
        .replace('.', '');
      return `${formattedMonth.charAt(0).toUpperCase()}${formattedMonth.slice(1)}`;
    default:
      return `${date.getDate()}.${date.getMonth() + 1}.`;
  }
};
