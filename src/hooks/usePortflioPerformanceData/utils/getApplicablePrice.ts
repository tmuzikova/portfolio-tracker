import { HistoricalPriceData } from '@/types/historicalPrices';
import { FX_RATE } from '@/utils/portfolioCalculations/const/FX_RATE';

export const getApplicablePrice = (
  symbolPriceData: HistoricalPriceData | undefined,
  date: string,
  lastAvailablePrices: Record<string, number>,
): number | undefined => {
  if (!symbolPriceData) return undefined;

  const priceOnDate = symbolPriceData.historical.find(
    (entry) => entry.date === date,
  );

  if (priceOnDate) {
    return priceOnDate.close * FX_RATE;
  }

  const previousPrices = symbolPriceData.historical
    .filter((entry) => entry.date < date)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (previousPrices.length > 0) {
    return previousPrices[0].close * FX_RATE;
  }

  return lastAvailablePrices[symbolPriceData.symbol];
};
