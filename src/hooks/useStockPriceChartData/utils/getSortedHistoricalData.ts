import { HistoricalPriceEntry } from '@/types/historicalPrices';

export const getSortedHistoricalData = (
  data: HistoricalPriceEntry[],
): HistoricalPriceEntry[] =>
  [...data].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
