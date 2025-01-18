import { getLatestPriceForSymbol } from '@/utils/portfolioCalculations/getLatestPriceForSymbol';
import { HistoricalPriceData } from '@/types/historicalPrices';

const getTradingMonthPriceDifference = (
  stockPrices: HistoricalPriceData,
  latestPrice: number,
) => {
  const tradingDaysInMonth = 21; //assuming approx. 21 trading days in a month

  const isDataMissing = stockPrices.historical.length < tradingDaysInMonth;
  if (isDataMissing) {
    return null;
  }

  const monthAgoPrice = stockPrices.historical[tradingDaysInMonth].close;

  const absoluteDifference = latestPrice - monthAgoPrice;
  const percentageDifference = (absoluteDifference / monthAgoPrice) * 100;

  return {
    absoluteDifference,
    percentageDifference,
  };
};

export const useStockCardData = (
  symbol: string,
  stockPrices: HistoricalPriceData,
) => {
  const latestPrice = getLatestPriceForSymbol(symbol, stockPrices);
  const tradingMonthPriceDifferences = getTradingMonthPriceDifference(
    stockPrices,
    latestPrice,
  );
  const absoluteDifference =
    tradingMonthPriceDifferences?.absoluteDifference || null;
  const percentageDifference =
    tradingMonthPriceDifferences?.percentageDifference || null;

  return {
    latestPrice,
    absoluteDifference,
    percentageDifference,
  };
};
