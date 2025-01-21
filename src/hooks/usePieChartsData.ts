import { useCurrentPortfolioData } from './useCurrentPortfolioData';
import { PieChartDataType } from '@/types/pieCharts';
import { sectorsTranslation } from '@/utils/sectorsIndustryTranslation';
import { useHistoricalDividends } from './useHistoricalDividends';
import { CurrentPortfolioItemWithPriceData } from '@/types/currentPortfolio';
import { HistoricalDividendDataWithLastUpdated } from '@/types/historicalDividends';

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
    currentPortfolioWithPrices.reduce<Accumulator>((acc, item) => {
      return {
        ...acc,
        [item.holding.holdingSymbol]: acc[item.holding.holdingSymbol]
          ? {
              ...acc[item.holding.holdingSymbol],
              portfolioShare:
                acc[item.holding.holdingSymbol].portfolioShare +
                item.portfolioShare,
            }
          : {
              groupProperty: item.holding.holdingSymbol,
              holdingName: item.holding.holdingName,
              portfolioShare: item.portfolioShare,
              fill: '',
            },
      };
    }, {}),
  );

  const groupBySector = groupTopTenAndOthers(
    currentPortfolioWithPrices.reduce<Accumulator>((acc, item) => {
      const sector = item.sector || '';
      const translatedSector = sectorsTranslation[sector] || 'Nezařazeno';

      return {
        ...acc,
        [translatedSector]: acc[translatedSector]
          ? {
              ...acc[translatedSector],
              portfolioShare:
                acc[translatedSector].portfolioShare + item.portfolioShare,
            }
          : {
              groupProperty: translatedSector,
              portfolioShare: item.portfolioShare,
              fill: '',
            },
      };
    }, {}),
  );

  const groupByType = groupTopTenAndOthers(
    currentPortfolioWithPrices.reduce<Accumulator>((acc, item) => {
      const type = item.type.isEtf
        ? 'ETF'
        : item.type.isFund
          ? 'Fond'
          : 'Akcie';

      return {
        ...acc,
        [type]: acc[type]
          ? {
              ...acc[type],
              portfolioShare: acc[type].portfolioShare + item.portfolioShare,
            }
          : {
              groupProperty: type,
              portfolioShare: item.portfolioShare,
              fill: '',
            },
      };
    }, {}),
  );

  const groupByDividends = (
    portfolio: CurrentPortfolioItemWithPriceData[],
    dividendData: HistoricalDividendDataWithLastUpdated[],
    totalPortfolioValue: number,
  ): Record<string, PieChartDataType> => {
    const dividendSymbols = new Set(
      dividendData
        .filter((data) => data.hasDividends)
        .map((data) => data.symbol),
    );

    return portfolio.reduce<Record<string, PieChartDataType>>((acc, item) => {
      console.log('current value item:', item.currentValue.total);
      console.log('totalportfolioValue', totalPortfolioValue);
      const portfolioShare =
        (item.currentValue.total / totalPortfolioValue) * 100;
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
    ? groupByDividends(
        currentPortfolioWithPrices,
        dividendData,
        totalPortfolioValue,
      )
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
