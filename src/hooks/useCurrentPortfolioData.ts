import { useTransactionStore } from '@/stores/TransactionStore';
import { getSavedTransactions } from '@/utils/getSavedTransactions';
import { getCurrentPortfolio } from '@/utils/portfolioCalculations/getCurrentPortfolio';
import { useHistoricalStockPrices } from './useHistoricalStockPrices';
import { FX_RATE } from '@/utils/portfolioCalculations/const/FX_RATE';
import { CurrentPortfolioItemWithPriceData } from '@/types/currentPortfolio';

export const useCurrentPortfolioData = () => {
  const existingTransactions = useTransactionStore(
    (state) => state.transactions,
  );
  const savedTransactions = getSavedTransactions();
  const currentPortfolio = getCurrentPortfolio({
    existingTransactions,
    savedTransactions,
  });

  const {
    data: priceData,
    isLoading,
    error,
  } = useHistoricalStockPrices(currentPortfolio);

  const totalPortfolioValue = currentPortfolio.reduce((sum, item) => {
    const priceInfo = priceData?.find(
      (price) => price.symbol === item.holding.holdingSymbol,
    );

    const latestPrice = priceInfo?.historical?.[0]?.close || 0;
    return sum + latestPrice * item.totalNumberOfStocks * FX_RATE;
  }, 0);

  const currentPortfolioWithPrices: CurrentPortfolioItemWithPriceData[] =
    currentPortfolio.map((item) => {
      const priceInfo = priceData?.find(
        (price) => price.symbol === item.holding.holdingSymbol,
      );

      const latestPriceEntry = priceInfo?.historical?.[0];
      const latestPrice = latestPriceEntry?.close || 0;

      const currentValueTotal = latestPrice * item.totalNumberOfStocks;
      const totalInvested = item.value.total + item.totalFees;
      const absoluteProfit = currentValueTotal - totalInvested;
      const percentageProfit = totalInvested
        ? (absoluteProfit / totalInvested) * 100
        : 0;

      return {
        id: item.id,
        holding: {
          holdingIcon: item.holding.holdingIcon,
          holdingSymbol: item.holding.holdingSymbol,
          holdingName: item.holding.holdingName,
        },
        totalNumberOfStocks: item.totalNumberOfStocks,
        purchaseValue: {
          total: item.value.total * FX_RATE,
          avgPricePerShare: item.value.avgPricePerShare * FX_RATE,
        },
        totalFees: item.totalFees * FX_RATE,
        currentValue: {
          total: currentValueTotal * FX_RATE,
          pricePerShare: latestPrice * FX_RATE,
        },
        profit: {
          absolute: absoluteProfit * FX_RATE,
          percentage: percentageProfit,
        },
        portfolioShare: currentValueTotal
          ? (currentValueTotal / totalPortfolioValue) * 100 * FX_RATE
          : 0,
      };
    });

  return { currentPortfolioWithPrices, isLoading, error };
};
