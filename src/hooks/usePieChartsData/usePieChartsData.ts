import { useTransactionStore } from '@/stores/TransactionStore';
import { getSavedTransactions } from '@/utils/getSavedTransactions';
import { getCurrentPortfolio } from '@/utils/portfolioCalculations/getCurrentPortfolio';
import { useHistoricalStockPrices } from '../useHistoricalStockPrices';
import { calculateTotalPortfolioValue } from '@/utils/portfolioCalculations/calculateTotalPortfolioValue';
import { groupTopTenAndOthers } from './utils/groupTopTenAndOthers';
import { groupByHoldings } from './utils/groupByHoldings';
import { groupBySector } from './utils/groupBySectors';
import { groupByType } from './utils/groupByType';
import { useHistoricalDividends } from '../useHistoricalDividends';
import { groupByDividends } from './utils/groupByDividends';
import { COLORS } from './const/COLORS';

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
    isLoading: isPriceDataLoading,
    error: priceDataError,
  } = useHistoricalStockPrices(currentPortfolio);

  const {
    data: dividendData,
    isLoading: isDividendDataLoading,
    error: dividendDataError,
  } = useHistoricalDividends();

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

  const groupedDividends = dividendData
    ? groupByDividends(currentPortfolio, dividendData, totalPortfolioValue)
    : {};

  const groupedDividendsForChart = Object.values(groupedDividends).map(
    (item, index) => ({
      ...item,
      fill: COLORS[index],
    }),
  );

  return {
    holdingData: groupedHoldings,
    sectorData: groupedSectors,
    typeData: groupedTypes,
    dividendData: groupedDividendsForChart,
    isLoading: isPriceDataLoading || isDividendDataLoading,
    error: priceDataError || dividendDataError,
  };
};
