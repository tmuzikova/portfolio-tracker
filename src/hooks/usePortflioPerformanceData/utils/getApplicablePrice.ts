import { HistoricalPriceData } from '@/types/historicalPrices';
import { FX_RATE } from '@/utils/portfolioCalculations/const/FX_RATE';

type PriceEntry = {
  date: string;
  close: number;
};

const findExactDatePrice = (
  historicalPrices: PriceEntry[],
  targetDate: string,
): number | undefined => {
  const priceOnDate = historicalPrices.find(
    (entry) => entry.date === targetDate,
  );
  return priceOnDate ? priceOnDate.close * FX_RATE : undefined;
};

const findMostRecentPrice = (
  historicalPrices: PriceEntry[],
  targetDate: string,
): number | undefined => {
  const previousPrices = historicalPrices
    .filter((entry) => entry.date < targetDate)
    .sort((a, b) => b.date.localeCompare(a.date));

  return previousPrices.length > 0
    ? previousPrices[0].close * FX_RATE
    : undefined;
};

export const getApplicablePrice = (
  symbolPriceData: HistoricalPriceData,
  date: string,
  lastAvailablePrices: Record<string, number>,
): number | undefined => {
  const { historical, symbol } = symbolPriceData;

  const exactPrice = findExactDatePrice(historical, date);
  if (exactPrice) return exactPrice;

  const recentPrice = findMostRecentPrice(historical, date);
  if (recentPrice) return recentPrice;

  return lastAvailablePrices[symbol];
};
