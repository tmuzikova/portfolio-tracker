import { TimeRange } from '@/features/stockCard/components/StockCard';

export const getDaysForTimeRange = (timeRange: TimeRange): number => {
  const DAYS_IN_WEEK = 7;
  const DAYS_IN_MONTH = 30;
  const DAYS_IN_YEAR = 360;
  const DAYS_IN_FIVE_YEARS = DAYS_IN_YEAR * 5;

  const daysMap: Record<string, number> = {
    '1T': DAYS_IN_WEEK,
    '1M': DAYS_IN_MONTH,
    '1R': DAYS_IN_YEAR,
    '5R': DAYS_IN_FIVE_YEARS,
    YTD: 0, // separate case for YTD, as it's calculated differently
  };

  return daysMap[timeRange];
};
