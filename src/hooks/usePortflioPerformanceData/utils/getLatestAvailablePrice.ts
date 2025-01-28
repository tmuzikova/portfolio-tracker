import { HistoricalPriceData } from '@/types/historicalPrices';
import { FX_RATE } from '@/utils/portfolioCalculations/const/FX_RATE';

export const getLatestAvailablePrices = (
  stockPrices: HistoricalPriceData[],
): Record<string, number> => {
  return stockPrices.reduce((prices, stock) => {
    if (stock.historical.length > 0) {
      return {
        ...prices,
        [stock.symbol]: stock.historical[0].close * FX_RATE,
      };
    }
    return prices;
  }, {});
};
