import { HistoricalPriceData } from '@/types/historicalPrices';
import { DailyPortfolio } from './getDailyPortfolio';
import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { FX_RATE } from './const/FX_RATE';

export const calculateDailyPortfolioValues = (
  dailyPortfolio: DailyPortfolio,
  stockPrices: HistoricalPriceData[],
): { date: string; portfolio_value: number }[] => {
  const lastAvailablePrices: Record<string, number> = {};
  const priceDataMap = new Map(stockPrices.map((data) => [data.symbol, data]));

  stockPrices.forEach((stock) => {
    if (stock.historical.length > 0) {
      lastAvailablePrices[stock.symbol] = stock.historical[0].close * FX_RATE;
    }
  });

  return Object.entries(dailyPortfolio)
    .map(([date, portfolio]) => {
      const portfolioValue = portfolio.reduce(
        (sum, item: CurrentPortfolioItem) => {
          const symbolPriceData = priceDataMap.get(item.holding.holdingSymbol);

          if (!symbolPriceData) {
            console.warn(
              `No historical data available for ${item.holding.holdingSymbol}`,
            );
            return sum;
          }

          let applicablePrice: number | undefined;

          const priceOnDate = symbolPriceData.historical.find(
            (entry) => entry.date === date,
          );

          if (priceOnDate) {
            applicablePrice = priceOnDate.close * FX_RATE;
            lastAvailablePrices[item.holding.holdingSymbol] = applicablePrice;
          } else {
            const previousPrices = symbolPriceData.historical
              .filter((entry) => entry.date < date)
              .sort((a, b) => b.date.localeCompare(a.date));

            if (previousPrices.length > 0) {
              applicablePrice = previousPrices[0].close * FX_RATE;
              lastAvailablePrices[item.holding.holdingSymbol] = applicablePrice;
            } else {
              applicablePrice = lastAvailablePrices[item.holding.holdingSymbol];
            }
          }

          if (!applicablePrice) {
            console.warn(
              `Unable to determine price for ${item.holding.holdingSymbol} on ${date}`,
            );
            return sum;
          }

          return sum + applicablePrice * item.totalNumberOfStocks;
        },
        0,
      );

      return { date, portfolio_value: portfolioValue };
    })
    .filter((entry) => entry.portfolio_value > 0);
};
