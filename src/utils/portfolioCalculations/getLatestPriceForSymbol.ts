import { HistoricalPriceData } from '@/types/historicalPrices';

export const getLatestPriceForSymbol = (
  symbol: string,
  priceData: HistoricalPriceData[] = [],
) => {
  const priceInfo = priceData?.find((price) => price.symbol === symbol);
  return priceInfo?.historical?.[0]?.close || 0;
};
