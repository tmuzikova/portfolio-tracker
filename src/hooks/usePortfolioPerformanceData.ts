import { HistoricalPriceData } from '@/types/historicalPrices';
import { calculateDailyPortfolioValues } from '@/utils/portfolioCalculations/calculateDailyPortfolioValue';
import { DailyPortfolio } from '@/utils/portfolioCalculations/getDailyPortfolio';

type ChartDataPoint = {
  date: string;
  portfolio_value: number;
};

type TimeRangeData = {
  allTime: ChartDataPoint[];
  oneYear: ChartDataPoint[];
  ytd: ChartDataPoint[];
  oneMonth: ChartDataPoint[];
  oneWeek: ChartDataPoint[];
};

export const usePortfolioPerformanceData = (
  dailyPortfolio: DailyPortfolio,
  stockPrices: HistoricalPriceData[],
): TimeRangeData => {
  const allDailyValues = calculateDailyPortfolioValues(
    dailyPortfolio,
    stockPrices,
  ).sort((a, b) => a.date.localeCompare(b.date));

  const getDataForTimeRange = (days: number): ChartDataPoint[] => {
    return allDailyValues.slice(-days);
  };

  const getYTDData = (): ChartDataPoint[] => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

    return allDailyValues.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfYear && entryDate <= currentDate;
    });
  };

  // approx. number of trading days
  const DAYS_IN_WEEK = 5;
  const DAYS_IN_MONTH = 21;
  const DAYS_IN_YEAR = 252;

  return {
    allTime: allDailyValues,
    oneYear: getDataForTimeRange(DAYS_IN_YEAR),
    ytd: getYTDData(),
    oneMonth: getDataForTimeRange(DAYS_IN_MONTH),
    oneWeek: getDataForTimeRange(DAYS_IN_WEEK),
  };
};
