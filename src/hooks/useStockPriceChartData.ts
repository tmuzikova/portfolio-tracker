import {
  HistoricalPriceData,
  HistoricalPriceEntry,
} from '@/types/historicalPrices';

type ChartDataPoint = {
  date: string;
  stock_price: number;
};

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
  const transformToChartData = (
    data: HistoricalPriceEntry[],
  ): ChartDataPoint[] => {
    return data.map((entry) => ({
      date: entry.date,
      stock_price: entry.close,
    }));
  };

  const getDataForTimeRange = (days: number): ChartDataPoint[] => {
    const sortedData = [...historicalPriceData.historical].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    return transformToChartData(sortedData.slice(-days));
  };

  const getYTDData = (): ChartDataPoint[] => {
    const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

    const ytdData = historicalPriceData.historical
      .filter((entry) => {
        const entryDate = new Date(entry.date);
        return entryDate >= startOfYear && entryDate <= currentDate;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return transformToChartData(ytdData);
  };

  const calculateTimeRangeData = (): TimeRangeData => {
    //approx. number of trading days
    const DAYS_IN_WEEK = 5;
    const DAYS_IN_MONTH = 21;
    const DAYS_IN_YEAR = 252;
    const DAYS_IN_FIVE_YEARS = DAYS_IN_YEAR * 5;

    return {
      lastWeek: getDataForTimeRange(DAYS_IN_WEEK),
      lastMonth: getDataForTimeRange(DAYS_IN_MONTH),
      lastYear: getDataForTimeRange(DAYS_IN_YEAR),
      ytd: getYTDData(),
      fiveYears: getDataForTimeRange(DAYS_IN_FIVE_YEARS),
    };
  };

  return calculateTimeRangeData();
};
