import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { PriceMap } from './calculateDailyPortfolioValue';
import { calculatePortfolioItemValue } from './calculatePortfolioItemValue';

export const calculatePortfolioValueForDate = (
  portfolio: CurrentPortfolioItem[],
  date: string,
  priceMap: PriceMap,
  fallbackPrices: Record<string, number>,
): number => {
  return portfolio.reduce((totalValue, item) => {
    const priceData = priceMap.get(item.holding.holdingSymbol);
    if (!priceData) {
      console.warn(
        `No price data available for ${item.holding.holdingSymbol} on ${date}`,
      );
      return totalValue;
    }

    return (
      totalValue +
      calculatePortfolioItemValue(item, priceData, date, fallbackPrices)
    );
  }, 0);
};
