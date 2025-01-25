import { HistoricalPriceData } from '@/types/historicalPrices';
import { transformToChartData } from './utils/transformToChartData';
import { getSortedHistoricalData } from './utils/getSortedHistoricalData';
import { ChartDataPoint } from '@/types/chartDataPoint';
import { getStartOfYear } from './utils/getStartOfTheYear';

type TimeRangeData = {
  lastWeek: ChartDataPoint[];
  lastMonth: ChartDataPoint[];
  lastYear: ChartDataPoint[];
  ytd: ChartDataPoint[];
  fiveYears: ChartDataPoint[];
};

export const useStockPriceChartData = (
  historicalPriceData: HistoricalPriceData,
): TimeRangeData => {
  // approx. number of trading days
  const DAYS_IN_WEEK = 5;
  const DAYS_IN_MONTH = 21;
  const DAYS_IN_YEAR = 252;
  const DAYS_IN_FIVE_YEARS = DAYS_IN_YEAR * 5;

  const getDataForLastNDays = (days: number): ChartDataPoint[] => {
    const sortedData = getSortedHistoricalData(historicalPriceData.historical);
    return transformToChartData(sortedData.slice(-days));
  };

  const getYTDData = (): ChartDataPoint[] => {
    const currentDate = new Date();
    const startOfYear = getStartOfYear(currentDate);

    const ytdData = historicalPriceData.historical.filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfYear && entryDate <= currentDate;
    });

    return transformToChartData(getSortedHistoricalData(ytdData));
  };

  return {
    lastWeek: getDataForLastNDays(DAYS_IN_WEEK),
    lastMonth: getDataForLastNDays(DAYS_IN_MONTH),
    lastYear: getDataForLastNDays(DAYS_IN_YEAR),
    ytd: getYTDData(),
    fiveYears: getDataForLastNDays(DAYS_IN_FIVE_YEARS),
  };
};
