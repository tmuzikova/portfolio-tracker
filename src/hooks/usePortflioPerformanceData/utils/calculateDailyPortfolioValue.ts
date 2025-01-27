import { HistoricalPriceData } from '@/types/historicalPrices';
import { DailyPortfolio } from '@/utils/portfolioCalculations/getDailyPortfolio';
import { getLatestAvailablePrices } from './getLatestAvailablePrice';
import { calculatePortfolioValueForDate } from './calculatePortfolioValueForDate';

export type PortfolioValueEntry = {
  date: string;
  portfolio_value: number;
};

export type PriceMap = Map<string, HistoricalPriceData>;

export const calculateDailyPortfolioValues = (
  dailyPortfolio: DailyPortfolio,
  stockPrices: HistoricalPriceData[],
): PortfolioValueEntry[] => {
  const fallbackPrices = getLatestAvailablePrices(stockPrices);
  const priceMap: PriceMap = new Map(
    stockPrices.map((data) => [data.symbol, data]),
  );

  return Object.entries(dailyPortfolio).map(
    ([date, portfolio]): PortfolioValueEntry => ({
      date,
      portfolio_value: calculatePortfolioValueForDate(
        portfolio,
        date,
        priceMap,
        fallbackPrices,
      ),
    }),
  );
};
