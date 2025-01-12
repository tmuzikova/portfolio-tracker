import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { dailyPortfolioCalculationParams } from '@/types/calculations';
import { getCurrentPortfolio } from './getCurrentPortfolio';

export type DailyPortfolio = Record<string, CurrentPortfolioItem[]>;

export const getDailyPortfolio = ({
  existingTransactions,
  savedTransactions,
  startDate,
  endDate,
}: dailyPortfolioCalculationParams): DailyPortfolio => {
  const transactions = [...existingTransactions, ...savedTransactions];

  const dateRange = Array.from(
    {
      length:
        (new Date(endDate).getTime() - new Date(startDate).getTime()) /
          (1000 * 60 * 60 * 24) +
        1,
    },
    (_, i) =>
      new Date(new Date(startDate).getTime() + i * (1000 * 60 * 60 * 24))
        .toISOString()
        .split('T')[0],
  );

  return dateRange.reduce<DailyPortfolio>((dailyPortfolio, currentDate) => {
    const transactionsUpToDate = transactions.filter(
      (tx) => tx.transactionDate <= currentDate,
    );

    const portfolioForTheDay = getCurrentPortfolio({
      existingTransactions: transactionsUpToDate,
      savedTransactions: [],
    });

    return {
      ...dailyPortfolio,
      [currentDate]: portfolioForTheDay,
    };
  }, {});
};
