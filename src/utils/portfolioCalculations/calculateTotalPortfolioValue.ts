import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { HistoricalPriceData } from '@/types/historicalPrices';
import { getLatestPriceForSymbol } from './getLatestPriceForSymbol';
import { FX_RATE } from './const/FX_RATE';

export const calculateTotalPortfolioValue = (
  currentPortfolio: CurrentPortfolioItem[],
  priceData: HistoricalPriceData[] = [],
): number => {
  return currentPortfolio.reduce((sum, item) => {
    const latestPrice = getLatestPriceForSymbol(
      item.holding.holdingSymbol,
      priceData,
    );
    return sum + latestPrice * item.totalNumberOfStocks * FX_RATE;
  }, 0);
};
