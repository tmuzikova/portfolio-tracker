import { HistoricalPriceData } from '@/types/historicalPrices';

export const calculateYTDPriceDifference = (
  historicalPrices: HistoricalPriceData,
  latestPrice: number,
): { absoluteDifference: number; percentageDifference: number } | null => {
  const currentDate = new Date();
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1);

  const ytdData = historicalPrices.historical
    .filter((entry) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startOfYear && entryDate <= currentDate;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  if (ytdData.length === 0) {
    return null;
  }

  const firstPriceOfYear = ytdData[0]?.close;

  if (firstPriceOfYear === undefined) {
    return null;
  }

  const absoluteDifference = latestPrice - firstPriceOfYear;
  const percentageDifference = (absoluteDifference / firstPriceOfYear) * 100;

  return { absoluteDifference, percentageDifference };
};
