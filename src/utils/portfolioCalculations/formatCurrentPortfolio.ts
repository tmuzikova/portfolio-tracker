import {
  CurrentPortfolioItem,
  CurrentPortfolioTransaction,
} from '@/types/calculations';

export const formatCurrentPortfolio = (
  currentPortfolio: CurrentPortfolioTransaction[],
): CurrentPortfolioItem[] => {
  return Object.values(
    currentPortfolio.reduce<Record<string, CurrentPortfolioItem>>((acc, tx) => {
      const { holdingSymbol, holdingIcon, holdingName } = tx.holding;
      const existingHolding = acc[holdingSymbol];
      const newNumberOfStocks =
        (existingHolding?.totalNumberOfStocks || 0) +
        tx.remainingNumberOfStocksOwned;
      const newTransactionValue =
        tx.remainingNumberOfStocksOwned * tx.transactionValue.perShare;
      const newTotalValue =
        (existingHolding?.value.total || 0) + newTransactionValue;
      const newTotalFees =
        (existingHolding?.totalFees || 0) + (tx.transactionFee?.total || 0);

      return {
        ...acc,
        [holdingSymbol]: {
          id: crypto.randomUUID(),
          holding: {
            holdingIcon: holdingIcon || '',
            holdingSymbol,
            holdingName: holdingName || '',
          },
          totalNumberOfStocks: newNumberOfStocks,
          totalFees: newTotalFees,
          value: {
            total: newTotalValue,
            avgPricePerShare:
              newNumberOfStocks > 0 ? newTotalValue / newNumberOfStocks : 0,
            currency: tx.transactionValue.currency,
          },
        },
      };
    }, {}),
  );
};
