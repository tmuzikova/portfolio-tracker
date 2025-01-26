import { CurrentPortfolioItem } from '@/types/currentPortfolio';

export const calculateTotalDividendsForSymbol = (
  symbol: string,
  historicalDividends: { recordDate: string; dividend: number }[],
  dailyPortfolio: Record<string, CurrentPortfolioItem[]>,
): number => {
  return historicalDividends.reduce(
    (totalDividends, { recordDate, dividend }) => {
      const portfolioOnDate = dailyPortfolio[recordDate] || [];

      const portfolioItem = portfolioOnDate.find(
        (item) => item.holding.holdingSymbol === symbol,
      );

      if (!portfolioItem) {
        return totalDividends;
      }

      const sharesOwned = portfolioItem.totalNumberOfStocks;
      return totalDividends + sharesOwned * dividend;
    },
    0,
  );
};
