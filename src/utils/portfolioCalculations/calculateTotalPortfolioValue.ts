import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { HistoricalPriceData } from '@/types/historicalPrices';
import { getLatestPriceForSymbol } from './getLatestPriceForSymbol';

export const calculateTotalPortfolioValue = (
  currentPortfolio: CurrentPortfolioItem[],
  priceData: HistoricalPriceData[] = [],
): number => {
  return currentPortfolio.reduce((sum, item) => {
    const latestPrice = getLatestPriceForSymbol(
      item.holding.holdingSymbol,
      priceData,
    );
    return sum + latestPrice * item.totalNumberOfStocks;
  }, 0);
};
