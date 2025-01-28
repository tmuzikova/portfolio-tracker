import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { dailyPortfolioCalculationParams } from '@/types/calculations';
import { getCurrentPortfolio } from './getCurrentPortfolio';

export type DailyPortfolio = Record<string, CurrentPortfolioItem[]>;

const generateDateRange = (startDate: string, endDate: string): string[] => {
  // calculate total number of days between startDate and endDate (inclusive)
  const daysInRange =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) /
      (1000 * 60 * 60 * 24) +
    1;

  // create an array of dates from startDate to endDate
  return Array.from({ length: daysInRange }, (_, index) => {
    // calculate the date for the current index (offset from startDate)
    const date = new Date(
      new Date(startDate).getTime() + index * (1000 * 60 * 60 * 24),
    );

    return date.toISOString().split('T')[0];
  });
};

export const getDailyPortfolio = ({
  transactions,
  startDate,
  endDate,
}: dailyPortfolioCalculationParams): DailyPortfolio => {
  const dateRange = generateDateRange(startDate, endDate);

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
