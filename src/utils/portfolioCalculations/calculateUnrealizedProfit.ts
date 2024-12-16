import { HistoricalPriceData } from '@/hooks/useHistoricalStockPrices';
import { CurrentPortfolioItem } from '@/types/types';
import { FX_RATE } from './const/FX_RATE';

export const calculateUnrealizedProfit = ({
  currentPortfolio,
  historicalPrices,
}: {
  currentPortfolio: CurrentPortfolioItem[];
  historicalPrices: HistoricalPriceData[];
}) => {
  return currentPortfolio.reduce((totalUnrealizedProfit, portfolioItem) => {
    const symbol = portfolioItem.holding.holdingSymbol;
    const currentStockPrice =
      historicalPrices.find((price) => price.symbol === symbol)?.historical[0]
        .close || 0;
    const purchasePrice = portfolioItem.value.avgPricePerShare;
    const numberOfStocksOwned = portfolioItem.totalNumberOfStocks;

    const unrealizedProfitForItem =
      (currentStockPrice - purchasePrice) * FX_RATE * numberOfStocksOwned;

    return totalUnrealizedProfit + unrealizedProfitForItem;
  }, 0);
};
