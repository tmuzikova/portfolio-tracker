import { HistoricalPriceData } from '@/types/historicalPrices';
import { DailyPortfolio } from '@/utils/portfolioCalculations/getDailyPortfolio';
import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { getLatestAvailablePrices } from './getLatestAvailablePrice';
import { getApplicablePrice } from './getApplicablePrice';

export const calculateDailyPortfolioValues = (
  dailyPortfolio: DailyPortfolio,
  stockPrices: HistoricalPriceData[],
): { date: string; portfolio_value: number }[] => {
  let lastAvailablePrices = getLatestAvailablePrices(stockPrices);
  const priceDataMap = new Map(stockPrices.map((data) => [data.symbol, data]));

  return Object.entries(dailyPortfolio)
    .map(([date, portfolio]) => {
      let currentLastAvailablePrices = { ...lastAvailablePrices };

      const portfolioValue = portfolio.reduce(
        (totalValue, item: CurrentPortfolioItem) => {
          const symbolPriceData = priceDataMap.get(item.holding.holdingSymbol);

          const applicablePrice = getApplicablePrice(
            symbolPriceData,
            date,
            currentLastAvailablePrices,
          );

          if (applicablePrice) {
            currentLastAvailablePrices = {
              ...currentLastAvailablePrices,
              [item.holding.holdingSymbol]: applicablePrice,
            };
            return totalValue + applicablePrice * item.totalNumberOfStocks;
          }

          console.warn(
            `Unable to determine price for ${item.holding.holdingSymbol} on ${date}`,
          );
          return totalValue;
        },
        0,
      );

      lastAvailablePrices = currentLastAvailablePrices;

      return { date, portfolio_value: portfolioValue };
    })
    .filter((entry) => entry.portfolio_value > 0);
};
