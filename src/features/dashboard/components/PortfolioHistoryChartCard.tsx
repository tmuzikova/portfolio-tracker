import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useHistoricalStockPrices } from '@/hooks/useHistoricalStockPrices';
import { useTransactionStore } from '@/stores/TransactionStore';
import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { getSavedTransactions } from '@/utils/getSavedTransactions';
import { getDailyPortfolio } from '@/utils/portfolioCalculations/getDailyPortfolio';
import { getSortedTransactions } from '@/utils/portfolioCalculations/getSortedTransactions';
import { PortfolioHistoryChart } from './PortfolioHistoryChart';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { LoadingState } from '@/components/LoadingState';

export type TimeRange = 'Za celou dobu' | '1R' | 'YTD' | '1M' | '1T';
const TIME_RANGES: TimeRange[] = ['Za celou dobu', '1R', 'YTD', '1M', '1T'];

export const PortfolioHistoryChartCard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('1R');
  const savedTransactions = getSavedTransactions();
  const existingTransactions = useTransactionStore(
    (state) => state.transactions,
  );
  const transactions = [...existingTransactions, ...savedTransactions];
  const startDate = getSortedTransactions(transactions)[0]?.transactionDate;

  const endDate = new Date().toISOString().split('T')[0];

  const dailyPortfolio = getDailyPortfolio({
    existingTransactions,
    savedTransactions,
    startDate,
    endDate,
  });
  const uniquePortfolioItems = Object.values(dailyPortfolio).reduce<
    CurrentPortfolioItem[]
  >((acc, portfolioItems) => {
    const uniqueItems = portfolioItems.filter(
      (item) =>
        !acc.some(
          (existing) =>
            existing.holding.holdingSymbol === item.holding.holdingSymbol,
        ),
    );
    return [...acc, ...uniqueItems];
  }, []);

  const {
    isLoading: isStockPricesLoading,
    data: stockPrices,
    error: stockPricesError,
  } = useHistoricalStockPrices(uniquePortfolioItems);

  if (isStockPricesLoading) {
    return <LoadingState />;
  }

  if (stockPricesError || !stockPrices) {
    return <div>Chyba při načítání dat</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-center p-0 md:flex-row md:justify-between">
        <div className="px-6 py-6">
          <CardTitle>Vývoj hodnoty portfolia</CardTitle>
        </div>
        <div className="!mt-0 flex flex-wrap justify-center gap-2 px-6 sm:py-6">
          {TIME_RANGES.map((range) => (
            <Button
              key={range}
              onClick={() => setSelectedTimeRange(range)}
              className={`rounded-md px-4 py-2 text-sm ${
                selectedTimeRange === range
                  ? 'text-white'
                  : 'bg-slate-200 text-primary hover:bg-slate-300'
              }`}
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <PortfolioHistoryChart
          stockPrices={stockPrices}
          dailyPortfolio={dailyPortfolio}
          selectedTimeRange={selectedTimeRange}
        />
      </CardContent>
    </Card>
  );
};
