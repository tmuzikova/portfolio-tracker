import { formatMonth } from '@/utils/formatMonth';
import { TimeRange } from '../components/PortfolioHistoryChartCard';

export const formatXAxisTick = (
  dateStr: string,
  index: number,
  selectedTimeRange: TimeRange,
) => {
  const date = new Date(dateStr);

  if (index === 0) {
    return '';
  }

  const timeRangeMap: Record<string, (date: Date) => string> = {
    'Za celou dobu': (date) => date.getFullYear().toString(),
    '1R': (date) => formatMonth(date),
    YTD: (date) => `${date.getDate()}.${date.getMonth() + 1}.`,
    '1M': (date) => `${date.getDate()}.${date.getMonth() + 1}.`,
    '1T': (date) => `${date.getDate()}.${date.getMonth() + 1}.`,
  };

  return timeRangeMap[selectedTimeRange](date);
};
