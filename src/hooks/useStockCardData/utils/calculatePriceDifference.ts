import { HistoricalPriceData } from '@/types/historicalPrices';

export const calculatePriceDifference = (
  historicalPrices: HistoricalPriceData,
  latestPrice: number,
  days: number,
): { absoluteDifference: number; percentageDifference: number } | null => {
  const sortedData = [...historicalPrices.historical].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  if (sortedData.length < days) {
    return null;
  }

  const pastPrice = sortedData[sortedData.length - days]?.close;

  if (pastPrice === undefined) {
    return null;
  }

  const absoluteDifference = latestPrice - pastPrice;
  const percentageDifference = (absoluteDifference / pastPrice) * 100;

  return { absoluteDifference, percentageDifference };
};
