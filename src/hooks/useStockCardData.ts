import { useSingleStockHistoricalPrices } from './useSingleStockHistoricalPrices';

export const useStockCardData = (symbol: string) => {
  const { latestPrice, symbolHistoricalStockPrices, isLoading, error } =
    useSingleStockHistoricalPrices(symbol);

  const getThirtyDayPriceDifference = () => {
    const isDataMissing =
      !symbolHistoricalStockPrices?.historical ||
      symbolHistoricalStockPrices.historical.length < 30;
    if (isDataMissing) {
      return null;
    }

    const thirtyDaysAgoPrice = symbolHistoricalStockPrices.historical[30].close;

    const absoluteDifference = latestPrice - thirtyDaysAgoPrice;
    const percentageDifference =
      (absoluteDifference / thirtyDaysAgoPrice) * 100;

    return {
      absoluteDifference,
      percentageDifference,
    };
  };

  const thirtyDayPriceDifference = getThirtyDayPriceDifference();
  const absoluteDifference = thirtyDayPriceDifference?.absoluteDifference || 0;
  const percentageDifference =
    thirtyDayPriceDifference?.percentageDifference || 0;

  return {
    absoluteDifference,
    percentageDifference,
    latestPrice,
    symbolHistoricalStockPrices,
    isLoading,
    error,
  };
};
