import { HistoricalPriceData } from '@/types/historicalPrices';

export const getLatestPriceForSymbol = (
  symbol: string,
  priceData: HistoricalPriceData | HistoricalPriceData[] = [],
): number => {
  const priceArray = Array.isArray(priceData) ? priceData : [priceData];

  const priceInfo = priceArray.find((price) => price.symbol === symbol);

  return priceInfo?.historical?.[0]?.close || 0;
};
