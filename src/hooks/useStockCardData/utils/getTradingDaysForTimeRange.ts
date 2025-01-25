import { TimeRange } from '@/features/stockCard/components/StockCard';

export const getTradingDaysForTimeRange = (timeRange: TimeRange): number => {
  // approx. number of trading days
  const DAYS_IN_WEEK = 5;
  const DAYS_IN_MONTH = 21;
  const DAYS_IN_YEAR = 252;
  const DAYS_IN_FIVE_YEARS = DAYS_IN_YEAR * 5;

  switch (timeRange) {
    case '1T':
      return DAYS_IN_WEEK;
    case '1M':
      return DAYS_IN_MONTH;
    case '1R':
      return DAYS_IN_YEAR;
    case '5R':
      return DAYS_IN_FIVE_YEARS;
    default:
      return 0; // separate case for YTD, as it's calculated differently
  }
};
