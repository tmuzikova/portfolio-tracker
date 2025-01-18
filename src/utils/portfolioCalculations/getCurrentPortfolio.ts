import {
  CurrentPortfolioItem,
  CurrentPortfolioTransaction,
} from '@/types/currentPortfolio';
import { formatCurrentPortfolio } from './formatCurrentPortfolio';
import {
  getSortedPurchaseTransactions,
  getSortedSaleTransactions,
} from './getSortedTransactions';
import { calculationParams } from '@/types/calculations';

export const getCurrentPortfolio = ({
  existingTransactions,
  savedTransactions,
}: calculationParams): CurrentPortfolioItem[] => {
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

  const updatedPurchaseTransactions = saleTransactions.reduce(
    (updatedPurchases, saleTx) => {
      let remainingNumberOfStocksToSell = saleTx.remainingNumberOfStocksToSell;

      return updatedPurchases.map((purchaseTx) => {
        if (remainingNumberOfStocksToSell <= 0) return purchaseTx;
        if (purchaseTx.holding.holdingSymbol !== saleTx.holding.holdingSymbol)
          return purchaseTx;

        const stocksToSell = Math.min(
          remainingNumberOfStocksToSell,
          purchaseTx.remainingNumberOfStocksOwned,
        );

        remainingNumberOfStocksToSell -= stocksToSell;

        return {
          ...purchaseTx,
          remainingNumberOfStocksOwned:
            purchaseTx.remainingNumberOfStocksOwned - stocksToSell,
        };
      });
    },
    purchaseTransactions,
  );

  const currentPortfolio = updatedPurchaseTransactions.filter(
    (tx) => tx.remainingNumberOfStocksOwned > 0,
  );

  return formatCurrentPortfolio(currentPortfolio);
};
