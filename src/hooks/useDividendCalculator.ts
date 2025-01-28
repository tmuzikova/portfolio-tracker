import { useHistoricalDividends } from '@/hooks/useHistoricalDividends';
import { getDailyPortfolio } from '@/utils/portfolioCalculations/getDailyPortfolio';
import { useTransactionStore } from '@/stores/TransactionStore';
import { getSortedTransactions } from '@/utils/portfolioCalculations/getSortedTransactions';
import { calculateTotalDividendsForSymbol } from '@/utils/portfolioCalculations/calculateTotalDividendsForSymbol';

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
    (dividendMap, { symbol, historical: historicalDividends }) => {
      const totalDividendsForSymbol = calculateTotalDividendsForSymbol(
        symbol,
        historicalDividends,
        dailyPortfolio,
      );

      dividendMap[symbol] = totalDividendsForSymbol;

      return dividendMap;
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
