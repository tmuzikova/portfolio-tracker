import { useTransactionStore } from '@/stores/TransactionStore';
import { getSavedTransactions } from '@/utils/getSavedTransactions';
import { getCurrentPortfolio } from '@/utils/portfolioCalculations/getCurrentPortfolio';
import { useHistoricalStockPrices } from './useHistoricalStockPrices';
import { FX_RATE } from '@/utils/portfolioCalculations/const/FX_RATE';
import {
  CurrentPortfolioItem,
  CurrentPortfolioItemWithPriceData,
} from '@/types/currentPortfolio';
import { HistoricalPriceData } from '@/types/historicalPrices';

const calculateTotalPortfolioValue = (
  currentPortfolio: CurrentPortfolioItem[],
  priceData: HistoricalPriceData[] = [],
): number => {
  return currentPortfolio.reduce((sum, item) => {
    const latestPrice = getLatestPriceForSymbol(
      item.holding.holdingSymbol,
      priceData,
    );
    return sum + latestPrice * item.totalNumberOfStocks * FX_RATE;
  }, 0);
};

const getLatestPriceForSymbol = (
  symbol: string,
  priceData: HistoricalPriceData[] = [],
) => {
  const priceInfo = priceData?.find((price) => price.symbol === symbol);
  return priceInfo?.historical?.[0]?.close || 0;
};

const enhancePortfolioItem = (
  item: CurrentPortfolioItem,
  priceData: HistoricalPriceData[] = [],
  totalPortfolioValue: number,
): CurrentPortfolioItemWithPriceData => {
  const latestPrice = getLatestPriceForSymbol(
    item.holding.holdingSymbol,
    priceData,
  );
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
      ? (currentValueTotal / totalPortfolioValue) * 100
      : 0,
  };
};

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

  const totalPortfolioValue = calculateTotalPortfolioValue(
    currentPortfolio,
    priceData,
  );

  const currentPortfolioWithPrices = currentPortfolio.map((item) =>
    enhancePortfolioItem(item, priceData, totalPortfolioValue),
  );

  return { currentPortfolioWithPrices, isLoading, error };
};
