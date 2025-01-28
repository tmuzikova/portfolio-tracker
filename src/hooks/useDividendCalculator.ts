import { useHistoricalDividends } from '@/hooks/useHistoricalDividends';
import { getDailyPortfolio } from '@/utils/portfolioCalculations/getDailyPortfolio';
import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { useTransactionStore } from '@/stores/TransactionStore';
import { getSortedTransactions } from '@/utils/portfolioCalculations/getSortedTransactions';

export const useDividendCalculator = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  const startDate = getSortedTransactions(transactions)[0]?.transactionDate;

  const endDate = new Date().toISOString().split('T')[0];

  const dailyPortfolio = getDailyPortfolio({
    transactions,
    startDate,
    endDate,
  });

  const { data: dividendData, isLoading, error } = useHistoricalDividends();

  const symbolDividendMap = dividendData?.reduce<Record<string, number>>(
    (result, symbolData) => {
      const { symbol, historical } = symbolData;

      const totalDividendsForSymbol = historical.reduce(
        (totalDividend, entry) => {
          const exDividendDate = entry.recordDate;
          const dividendPerShare = entry.dividend;

          const portfolioOnDate: CurrentPortfolioItem[] =
            dailyPortfolio[exDividendDate] || [];
          const holding = portfolioOnDate.find(
            (item) => item.holding.holdingSymbol === symbol,
          );

          if (holding) {
            const sharesOwned = holding.totalNumberOfStocks;
            return totalDividend + sharesOwned * dividendPerShare;
          }

          return totalDividend;
        },
        0,
      );

      result[symbol] = totalDividendsForSymbol;
      return result;
    },
    {},
  );

  const totalPortfolioDividends = Object.values(symbolDividendMap || {}).reduce(
    (sum, symbolDividends) => sum + symbolDividends,
    0,
  );

  return {
    symbolDividendMap,
    totalPortfolioDividends,
    isLoading,
    error,
  };
};
