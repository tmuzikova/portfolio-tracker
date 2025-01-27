import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { HistoricalPriceData } from '@/types/historicalPrices';
import { getApplicablePrice } from './getApplicablePrice';

export const calculatePortfolioItemValue = (
  item: CurrentPortfolioItem,
  priceData: HistoricalPriceData,
  date: string,
  fallbackPrices: Record<string, number>,
): number => {
  const price = getApplicablePrice(priceData, date, fallbackPrices);
  return price ? price * item.totalNumberOfStocks : 0;
};
