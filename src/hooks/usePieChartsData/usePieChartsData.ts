import { groupTopTenAndOthers } from './utils/groupTopTenAndOthers';
import { groupByHoldings } from './utils/groupByHoldings';
import { groupBySector } from './utils/groupBySectors';
import { groupByType } from './utils/groupByType';
import { useHistoricalDividends } from '../useHistoricalDividends';
import { groupByDividends } from './utils/groupByDividends';
import { COLORS } from './const/COLORS';
import { useCurrentPortfolioData } from '../useCurrentPortfolioData';

export const usePieChartsData = () => {
  const {
    totalPortfolioValueCZK: totalPortfolioValue,
    currentPortfolioWithPrices,
    isLoading: isPriceDataLoading,
    error: priceDataError,
  } = useCurrentPortfolioData();

  const {
    data: dividendData,
    isLoading: isDividendDataLoading,
    error: dividendDataError,
  } = useHistoricalDividends();

  const groupedHoldings = groupTopTenAndOthers(
    groupByHoldings(currentPortfolioWithPrices, totalPortfolioValue),
  );
  const groupedSectors = groupTopTenAndOthers(
    groupBySector(currentPortfolioWithPrices, totalPortfolioValue),
  );

  const groupedTypes = groupTopTenAndOthers(
    groupByType(currentPortfolioWithPrices, totalPortfolioValue),
  );

  const groupedDividends = dividendData
    ? groupByDividends(
        currentPortfolioWithPrices,
        dividendData,
        totalPortfolioValue,
      )
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
