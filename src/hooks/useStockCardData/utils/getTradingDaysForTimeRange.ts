import { TimeRange } from '@/features/stockCard/components/StockCard';

export const getTradingDaysForTimeRange = (timeRange: TimeRange): number => {
  // approx. number of trading days
  const DAYS_IN_WEEK = 5;
  const DAYS_IN_MONTH = 21;
  const DAYS_IN_YEAR = 252;
  const DAYS_IN_FIVE_YEARS = DAYS_IN_YEAR * 5;

  const tradingDaysMap: Record<string, number> = {
    '1T': DAYS_IN_WEEK,
    '1M': DAYS_IN_MONTH,
    '1R': DAYS_IN_YEAR,
    '5R': DAYS_IN_FIVE_YEARS,
    YTD: 0, // separate case for YTD, as it's calculated differently
  };

  return tradingDaysMap[timeRange];
};
