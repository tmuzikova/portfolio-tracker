import { useHistoricalStockPrices } from '@/hooks/useHistoricalStockPrices';
import { getSavedTransactions } from '@/utils/getSavedTransactions';
import { useTransactionStore } from '@/stores/TransactionStore';
import { getCurrentPortfolio } from '@/utils/portfolioCalculations/getCurrentPortfolio';
import { calculateUnrealizedProfit } from '@/utils/portfolioCalculations/calculateUnrealizedProfit';
import { calculateRealizedProfit } from '@/utils/portfolioCalculations/calculateRealizedProfit';
import { calculateInvestedAmount } from '@/utils/portfolioCalculations/calculateInvestedAmount';
import { calculateTotalFees } from '@/utils/portfolioCalculations/calculateFees';
import { useDividendCalculator } from './useDividendCalculator';
import { FX_RATE } from '@/utils/portfolioCalculations/const/FX_RATE';

export const useStatCardData = () => {
  const savedTransactions = getSavedTransactions();
  const existingTransactions = useTransactionStore(
    (state) => state.transactions,
  );

  const currentPortfolio = getCurrentPortfolio({
    existingTransactions,
    savedTransactions,
  });
  const { data: historicalPrices, isLoading } =
    useHistoricalStockPrices(currentPortfolio);

  const { totalPortfolioDividends } = useDividendCalculator();
  const dividends = totalPortfolioDividends * FX_RATE;

  const statData = {
    unrealizedProfit: isLoading
      ? 0
      : calculateUnrealizedProfit({
          currentPortfolio,
          historicalPrices: historicalPrices ?? [],
        }),
    realizedProfit: calculateRealizedProfit({
      existingTransactions,
      savedTransactions,
    }),
    investedAmount: calculateInvestedAmount({
      existingTransactions,
      savedTransactions,
    }),
    dividends: dividends,
    fees: calculateTotalFees({ existingTransactions, savedTransactions }),
  };

  const portfolioValue =
    statData.unrealizedProfit + statData.investedAmount.noFees;
  const totalValue = statData.realizedProfit + portfolioValue - statData.fees;
  const unrealizedProfitRelativeToPortfolioValue =
    statData.unrealizedProfit > 0
      ? ((statData.unrealizedProfit / portfolioValue) * 100).toFixed(2)
      : null;
  const dividendYield = ((statData.dividends / portfolioValue) * 100).toFixed(
    2,
  );
  const dividendYieldOnCost = (
    (statData.dividends / statData.investedAmount.withFees) *
    100
  ).toFixed(2);
  const feesPercentageOfInvestment = (
    (statData.fees / statData.investedAmount.withFees) *
    100
  ).toFixed(2);

  return {
    isLoading,
    statData,
    calculatedValues: {
      portfolioValue,
      totalValue,
      unrealizedProfitRelativeToPortfolioValue,
      dividendYield,
      dividendYieldOnCost,
      feesPercentageOfInvestment,
    },
  };
};
