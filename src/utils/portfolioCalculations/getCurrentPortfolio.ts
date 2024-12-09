import {
  getSortedPurchaseTransactions,
  getSortedSaleTransactions,
} from './getSortedTransactions';
import {
  calculationParams,
  CurrentPortfolioItem,
  CurrentPortfolioTransaction,
} from '../../types/types';

export const getCurrentPortfolio = ({
  existingTransactions,
  savedTransactions,
}: calculationParams) => {
  const transactions = [...existingTransactions, ...savedTransactions];

  const purchaseTransactions: CurrentPortfolioTransaction[] =
    getSortedPurchaseTransactions(transactions).map((tx) => ({
      ...tx,
      remainingNumberOfStocksOwned: tx.numberOfStocks,
    }));
  const saleTransactions = getSortedSaleTransactions(transactions).map(
    (tx) => ({
      ...tx,
      remainingNumberOfStocksToSell: tx.numberOfStocks,
    }),
  );

  saleTransactions.forEach((saleTx) => {
    let remainingNumberOfStocksToSell = saleTx.remainingNumberOfStocksToSell;

    purchaseTransactions.forEach((purchaseTx) => {
      if (remainingNumberOfStocksToSell <= 0) return;
      if (purchaseTx.holding.holdingSymbol !== saleTx.holding.holdingSymbol)
        return;

      const stocksToSell = Math.min(
        remainingNumberOfStocksToSell,
        purchaseTx.remainingNumberOfStocksOwned,
      );

      purchaseTx.remainingNumberOfStocksOwned -= stocksToSell;
      remainingNumberOfStocksToSell -= stocksToSell;
    });
  });

  const currentPortfolio = purchaseTransactions.filter(
    (tx) => tx.remainingNumberOfStocksOwned > 0,
  );

  const formattedPortfolio = formatCurrentPortfolio(currentPortfolio);

  return formattedPortfolio;
};

const formatCurrentPortfolio = (
  currentPortfolio: CurrentPortfolioTransaction[],
): CurrentPortfolioItem[] => {
  const portfolioMap = currentPortfolio.reduce(
    (acc, tx) => {
      const { holdingSymbol, holdingIcon, holdingName } = tx.holding;

      if (!acc[holdingSymbol]) {
        acc[holdingSymbol] = {
          id: crypto.randomUUID(),
          holding: {
            holdingIcon: holdingIcon || '',
            holdingSymbol: holdingSymbol,
            holdingName: holdingName || '',
          },
          totalNumberOfStocks: 0,
          totalFees: 0,
          value: {
            total: 0,
            avgPricePerShare: 0,
            currency: tx.transactionValue.currency,
          },
        };
      }

      acc[holdingSymbol].totalNumberOfStocks += tx.remainingNumberOfStocksOwned;
      acc[holdingSymbol].totalFees += tx.transactionFee?.total || 0;
      acc[holdingSymbol].value.total +=
        tx.remainingNumberOfStocksOwned * tx.transactionValue.perShare;

      return acc;
    },
    {} as Record<string, CurrentPortfolioItem>,
  );

  const formattedPortfolio = Object.values(portfolioMap).map((item) => ({
    ...item,
    value: {
      ...item.value,
      avgPricePerShare:
        item.totalNumberOfStocks > 0
          ? item.value.total / item.totalNumberOfStocks
          : 0,
    },
  }));

  return formattedPortfolio;
};
