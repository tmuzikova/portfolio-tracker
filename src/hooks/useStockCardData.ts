import { getLatestPriceForSymbol } from '@/utils/portfolioCalculations/getLatestPriceForSymbol';
import { HistoricalPriceData } from '@/types/historicalPrices';
import { TimeRange } from '@/features/stockCard/components/StockCard';

const calculatePriceDifference = (
  historicalPrices: HistoricalPriceData,
  latestPrice: number,
  days: number,
): { absoluteDifference: number; percentageDifference: number } | null => {
  const sortedData = [...historicalPrices.historical].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  if (sortedData.length < days) {
    return null;
  }

  const pastPrice = sortedData[sortedData.length - days]?.close;

  if (pastPrice === undefined) {
    return null;
  }

  const absoluteDifference = latestPrice - pastPrice;
  const percentageDifference = (absoluteDifference / pastPrice) * 100;

  return { absoluteDifference, percentageDifference };
};

const getTradingDaysForTimeRange = (timeRange: TimeRange): number => {
  // approx. number of trading days
  const DAYS_IN_WEEK = 5;
  const DAYS_IN_MONTH = 21;
  const DAYS_IN_YEAR = 252;
  const DAYS_IN_FIVE_YEARS = DAYS_IN_YEAR * 5;

  switch (timeRange) {
    case '7D':
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

const calculateYTDPriceDifference = (
  historicalPrices: HistoricalPriceData,
  latestPrice: number,
): { absoluteDifference: number; percentageDifference: number } | null => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

  const ytdData = historicalPrices.historical
    .filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfYear && entryDate <= currentDate;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); // Sort by date ascending

  if (ytdData.length === 0) {
    return null;
  }

  const firstPriceOfYear = ytdData[0]?.close;

  if (firstPriceOfYear === undefined) {
    return null;
  }

  const absoluteDifference = latestPrice - firstPriceOfYear;
  const percentageDifference = (absoluteDifference / firstPriceOfYear) * 100;

  return { absoluteDifference, percentageDifference };
};

export const useStockCardData = (
  symbol: string,
  stockPrices: HistoricalPriceData,
  selectedTimeRange: TimeRange,
) => {
  const latestPrice = getLatestPriceForSymbol(symbol, stockPrices);

  let priceDifferences: {
    absoluteDifference: number;
    percentageDifference: number;
  } | null = null;

  if (selectedTimeRange === 'YTD') {
    priceDifferences = calculateYTDPriceDifference(stockPrices, latestPrice);
  } else {
    const days = getTradingDaysForTimeRange(selectedTimeRange);
    priceDifferences = calculatePriceDifference(stockPrices, latestPrice, days);
  }

  return {
    latestPrice,
    absoluteDifference: priceDifferences?.absoluteDifference || null,
    percentageDifference: priceDifferences?.percentageDifference || null,
  };
};
