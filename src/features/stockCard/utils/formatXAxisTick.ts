import { formatMonth } from '@/utils/formatMonth';
import { TimeRange } from '../components/StockCard';

export const formatXAxisTick = (
  dateStr: string,
  index: number,
  range: TimeRange,
) => {
  const date = new Date(dateStr);

  if (index === 0) {
    return '';
  }

  const timeRangeMap: Record<string, (date: Date) => string> = {
    '5R': (date) => date.getFullYear().toString(),
    '1R': (date) => formatMonth(date),
    YTD: (date) => formatMonth(date),
    '1M': (date) => `${date.getDate()}.${date.getMonth() + 1}.`,
    '1T': (date) => `${date.getDate()}.${date.getMonth() + 1}.`,
  };

  return timeRangeMap[range](date);
};
