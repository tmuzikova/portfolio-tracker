import { useTransactionStore } from '@/stores/TransactionStore';
import { getSavedTransactions } from '@/utils/getSavedTransactions';
import { getCurrentPortfolio } from '@/utils/portfolioCalculations/getCurrentPortfolio';
import { useHistoricalStockPrices } from './useHistoricalStockPrices';
import { calculateTotalPortfolioValue } from '@/utils/portfolioCalculations/calculateTotalPortfolioValue';

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

  type Accumulator = Record<
    string,
    { stock: string; portfolioShare: number; fill: string }
  >;

  const groupTopTenAndOthers = (
    data: Accumulator,
  ): { stock: string; portfolioShare: number; fill: string }[] => {
    const sortedData = Object.values(data).sort(
      (a, b) => b.portfolioShare - a.portfolioShare,
    );

    const topItems = sortedData.slice(0, 10);
    const others = sortedData.slice(10);

    if (others.length > 0) {
      const othersTotal = others.reduce(
        (sum, item) => sum + item.portfolioShare,
        0,
      );

      topItems.push({
        stock: 'Ostatní',
        portfolioShare: othersTotal,
        fill: '#cccccc',
      });
    }

    return topItems;
  };

  const groupByHoldings = groupTopTenAndOthers(
    currentPortfolio.reduce<Accumulator>((acc, item) => {
      const portfolioShare = (item.value.total / totalPortfolioValue) * 100;

      return {
        ...acc,
        [item.holding.holdingName]: acc[item.holding.holdingName]
          ? {
              ...acc[item.holding.holdingName],
              portfolioShare:
                acc[item.holding.holdingName].portfolioShare + portfolioShare,
            }
          : {
              stock: item.holding.holdingName,
              portfolioShare,
              fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
            },
      };
    }, {}),
  );

  const groupBySector = groupTopTenAndOthers(
    currentPortfolio.reduce<Accumulator>((acc, item) => {
      const sector = item.sector || 'Neznámý';
      const portfolioShare = (item.value.total / totalPortfolioValue) * 100;

      return {
        ...acc,
        [sector]: acc[sector]
          ? {
              ...acc[sector],
              portfolioShare: acc[sector].portfolioShare + portfolioShare,
            }
          : {
              stock: sector,
              portfolioShare,
              fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
            },
      };
    }, {}),
  );

  const groupByType = Object.values(
    currentPortfolio.reduce<Accumulator>((acc, item) => {
      const type = item.type.isEtf
        ? 'ETF'
        : item.type.isFund
          ? 'Fond'
          : 'Akcie';
      const portfolioShare = (item.value.total / totalPortfolioValue) * 100;

      return {
        ...acc,
        [type]: acc[type]
          ? {
              ...acc[type],
              portfolioShare: acc[type].portfolioShare + portfolioShare,
            }
          : {
              stock: type,
              portfolioShare,
              fill: '#' + Math.floor(Math.random() * 16777215).toString(16),
            },
      };
    }, {}),
  );

  return {
    holdingData: groupByHoldings,
    sectorData: groupBySector,
    typeData: groupByType,
    isLoading,
    error,
  };
};
