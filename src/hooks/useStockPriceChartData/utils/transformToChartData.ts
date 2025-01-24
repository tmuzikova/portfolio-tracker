import { ChartDataPoint } from '@/types/chartDataPoint';
import { HistoricalPriceEntry } from '@/types/historicalPrices';

export const transformToChartData = (
  entries: HistoricalPriceEntry[],
): ChartDataPoint[] =>
  entries.map((entry) => ({
    date: entry.date,
    stock_price: entry.close,
  }));
