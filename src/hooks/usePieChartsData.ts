import { useTransactionStore } from '@/stores/TransactionStore';
import { getSavedTransactions } from '@/utils/getSavedTransactions';
import { getCurrentPortfolio } from '@/utils/portfolioCalculations/getCurrentPortfolio';
import { useHistoricalStockPrices } from './useHistoricalStockPrices';
import { calculateTotalPortfolioValue } from '@/utils/portfolioCalculations/calculateTotalPortfolioValue';
import { PieChartDataType } from '@/types/PieCharts';

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

  const COLORS = [
    '#9E0142',
    '#D53E4F',
    '#F46D43',
    '#FDAE61',
    '#FEE08B',
    '#FFFFBF',
    '#E6F598',
    '#ABDDA4',
    '#66C2A5',
    '#3288BD',
    '#5E4FA2', //Others
  ];

  type Accumulator = Record<string, PieChartDataType>;

  const groupTopTenAndOthers = (data: Accumulator): PieChartDataType[] => {
    const sortedData = Object.values(data).sort(
      (a, b) => b.portfolioShare - a.portfolioShare,
    );

    const topItems = sortedData.slice(0, 10).map((item, index) => ({
      ...item,
      fill: COLORS[index],
    }));
    const others = sortedData.slice(10);

    if (others.length > 0) {
      const othersTotal = others.reduce(
        (sum, item) => sum + item.portfolioShare,
        0,
      );

      topItems.push({
        groupProperty: 'Ostatní',
        portfolioShare: othersTotal,
        fill: COLORS[10],
      });
    }

    return topItems;
  };

  const groupByHoldings = groupTopTenAndOthers(
    currentPortfolio.reduce<Accumulator>((acc, item) => {
      const portfolioShare = (item.value.total / totalPortfolioValue) * 100;

      return {
        ...acc,
        [item.holding.holdingSymbol]: acc[item.holding.holdingSymbol]
          ? {
              ...acc[item.holding.holdingSymbol],
              portfolioShare:
                acc[item.holding.holdingSymbol].portfolioShare + portfolioShare,
            }
          : {
              groupProperty: item.holding.holdingSymbol,
              holdingName: item.holding.holdingName,
              portfolioShare,
              fill: '',
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
              groupProperty: sector,
              portfolioShare,
              fill: '',
            },
      };
    }, {}),
  );

  const groupByType = groupTopTenAndOthers(
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
              groupProperty: type,
              portfolioShare,
              fill: '',
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
