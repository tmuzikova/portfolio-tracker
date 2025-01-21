import { useTransactionStore } from '@/stores/TransactionStore';
import { getSavedTransactions } from '@/utils/getSavedTransactions';
import { getCurrentPortfolio } from '@/utils/portfolioCalculations/getCurrentPortfolio';
import { useHistoricalStockPrices } from './useHistoricalStockPrices';
import { calculateTotalPortfolioValue } from '@/utils/portfolioCalculations/calculateTotalPortfolioValue';
import { PieChartDataType } from '@/types/pieCharts';
import { sectorsTranslation } from '@/utils/sectorsIndustryTranslation';
import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { HistoricalDividendDataWithLastUpdated } from '@/types/historicalDividends';
import { useHistoricalDividends } from './useHistoricalDividends';

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

  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))',
    'hsl(var(--chart-6))',
    'hsl(var(--chart-7))',
    'hsl(var(--chart-8))',
    'hsl(var(--chart-9))',
    'hsl(var(--chart-10))',
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

      return [
        ...topItems,
        {
          groupProperty: 'Ostatní',
          portfolioShare: othersTotal,
          fill: COLORS[10],
        },
      ];
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
      const sector = item.sector || '';
      const translatedSector = sectorsTranslation[sector] || 'Nezařazeno';
      const portfolioShare = (item.value.total / totalPortfolioValue) * 100;

      return {
        ...acc,
        [translatedSector]: acc[translatedSector]
          ? {
              ...acc[translatedSector],
              portfolioShare:
                acc[translatedSector].portfolioShare + portfolioShare,
            }
          : {
              groupProperty: translatedSector,
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

  const groupByDividends = (
    portfolio: CurrentPortfolioItem[],
    dividendData: HistoricalDividendDataWithLastUpdated[],
    totalPortfolioValue: number,
  ): Record<string, PieChartDataType> => {
    const dividendSymbols = new Set(
      dividendData
        .filter((data) => data.hasDividends)
        .map((data) => data.symbol),
    );

    return portfolio.reduce<Record<string, PieChartDataType>>((acc, item) => {
      const portfolioShare = (item.value.total / totalPortfolioValue) * 100;
      const groupKey = dividendSymbols.has(item.holding.holdingSymbol)
        ? 'Vyplácí dividendy'
        : 'Nevyplácí dividendy';

      return {
        ...acc,
        [groupKey]: acc[groupKey]
          ? {
              ...acc[groupKey],
              portfolioShare: acc[groupKey].portfolioShare + portfolioShare,
            }
          : {
              groupProperty: groupKey,
              portfolioShare,
              fill: '',
            },
      };
    }, {});
  };

  const groupedDividendData = dividendData
    ? groupByDividends(currentPortfolio, dividendData, totalPortfolioValue)
    : {};

  const dividendDataForChart = Object.values(groupedDividendData).map(
    (item, index) => ({
      ...item,
      fill: COLORS[index],
    }),
  );

  return {
    holdingData: groupByHoldings,
    sectorData: groupBySector,
    typeData: groupByType,
    dividendData: dividendDataForChart,
    isLoading: isPriceDataLoading || isDividendDataLoading,
    error: priceDataError || dividendDataError,
  };
};
