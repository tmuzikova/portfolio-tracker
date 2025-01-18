import { useTransactionStore } from '@/stores/TransactionStore';
import { getSavedTransactions } from '@/utils/getSavedTransactions';
import { getCurrentPortfolio } from '@/utils/portfolioCalculations/getCurrentPortfolio';
import { useHistoricalStockPrices } from '../useHistoricalStockPrices';
import { calculateTotalPortfolioValue } from '@/utils/portfolioCalculations/calculateTotalPortfolioValue';
import { groupTopTenAndOthers } from './utils/groupTopTenAndOthers';
import { groupByHoldings } from './utils/groupByHoldings';
import { groupBySector } from './utils/groupBySectors';
import { groupByType } from './utils/groupByType';

export const usePieChartsData = () => {
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

  const groupedHoldings = groupTopTenAndOthers(
    groupByHoldings(currentPortfolio, totalPortfolioValue),
  );
  const groupedSectors = groupTopTenAndOthers(
    groupBySector(currentPortfolio, totalPortfolioValue),
  );

  const groupedTypes = groupTopTenAndOthers(
    groupByType(currentPortfolio, totalPortfolioValue),
  );

  return {
    holdingData: groupedHoldings,
    sectorData: groupedSectors,
    typeData: groupedTypes,
    isLoading,
    error,
  };
};
