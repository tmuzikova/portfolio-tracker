import { CurrentPortfolioItemWithPriceData } from '@/types/currentPortfolio';
import { HistoricalDividendDataWithLastUpdated } from '@/types/historicalDividends';
import { PieChartDataType } from '../types/pieCharts';

export const groupByDividends = (
  portfolio: CurrentPortfolioItemWithPriceData[],
  dividendData: HistoricalDividendDataWithLastUpdated[],
  totalPortfolioValue: number,
): Record<string, PieChartDataType> => {
  const dividendSymbols = new Set(
    dividendData.filter((data) => data.hasDividends).map((data) => data.symbol),
  );

  return portfolio.reduce<Record<string, PieChartDataType>>((acc, item) => {
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
