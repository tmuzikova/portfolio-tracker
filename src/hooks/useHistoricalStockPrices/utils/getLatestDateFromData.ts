import { HistoricalPriceEntry } from '@/types/historicalPrices';

export const getLatestDateFromData = (
  data: HistoricalPriceEntry[] | undefined,
) => {
  if (!data || data.length === 0) return null;

  const sortedData = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return new Date(sortedData[0].date).toISOString().split('T')[0];
};
