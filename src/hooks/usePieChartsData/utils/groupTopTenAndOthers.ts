import { COLORS } from '../const/COLORS';
import { Accumulator } from '../types/accumulator';
import { PieChartDataType } from '../types/pieCharts';

export const groupTopTenAndOthers = (data: Accumulator): PieChartDataType[] => {
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
