import { getLatestPriceForSymbol } from '@/utils/portfolioCalculations/getLatestPriceForSymbol';
import { HistoricalPriceData } from '@/types/historicalPrices';
import { TimeRange } from '@/features/stockCard/components/StockCard';
import { calculatePriceDifference } from './utils/calculatePriceDifference';
import { calculateYTDPriceDifference } from './utils/calculateYTDPriceDifference';
import { getTradingDaysForTimeRange } from './utils/getDaysForTimeRange';

export const useStockCardData = (
  symbol: string,
  stockPrices: HistoricalPriceData,
  selectedTimeRange: TimeRange,
) => {
  const latestPrice = getLatestPriceForSymbol(symbol, stockPrices);

  const determinePriceDifferences = () => {
    if (!latestPrice || !stockPrices?.historical?.length) {
      return null;
    }

    if (selectedTimeRange === 'YTD') {
      return calculateYTDPriceDifference(stockPrices, latestPrice);
    }

    const days = getTradingDaysForTimeRange(selectedTimeRange);
    return calculatePriceDifference(stockPrices, latestPrice, days);
  };

  const priceDifferences = determinePriceDifferences();

  return {
    latestPrice,
    absoluteDifference: priceDifferences?.absoluteDifference ?? null,
    percentageDifference: priceDifferences?.percentageDifference ?? null,
  };
};
