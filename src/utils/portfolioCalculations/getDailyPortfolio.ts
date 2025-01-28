import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { dailyPortfolioCalculationParams } from '@/types/calculations';
import { getCurrentPortfolio } from './getCurrentPortfolio';

export type DailyPortfolio = Record<string, CurrentPortfolioItem[]>;

export const getDailyPortfolio = ({
  transactions,
  startDate,
  endDate,
}: dailyPortfolioCalculationParams): DailyPortfolio => {
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
      transactions: transactionsUpToDate,
    });

    return {
      ...dailyPortfolio,
      [currentDate]: portfolioForTheDay,
    };
  }, {});
};
