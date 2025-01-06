import { calculationParams } from '@/types/calculations';
import {
  getSortedPurchaseTransactions,
  getSortedSaleTransactions,
} from './getSortedTransactions';
import { FX_RATE } from './const/FX_RATE';
import { CurrentPortfolioTransaction } from '@/types/currentPortfolio';

export const calculateRealizedProfit = ({
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

  const { realizedProfit } = saleTransactions.reduce(
    (result, saleTx) => {
      let remainingNumberOfStocksToSell = saleTx.remainingNumberOfStocksToSell;

      const updatedPurchases = result.purchaseTransactions.map((purchaseTx) => {
        if (remainingNumberOfStocksToSell <= 0) return purchaseTx;
        if (purchaseTx.holding.holdingSymbol !== saleTx.holding.holdingSymbol)
          return purchaseTx;

        const stocksToSell = Math.min(
          remainingNumberOfStocksToSell,
          purchaseTx.remainingNumberOfStocksOwned,
        );

        const purchaseCost =
          (stocksToSell * purchaseTx.transactionValue.perShare +
            (purchaseTx.transactionFee?.total || 0)) *
          FX_RATE;
        const saleRevenue =
          stocksToSell * saleTx.transactionValue.perShare * FX_RATE;
        const saleFee = (saleTx.transactionFee?.total || 0) * FX_RATE;

        result.realizedProfit += saleRevenue - purchaseCost - saleFee;

        remainingNumberOfStocksToSell -= stocksToSell;

        return {
          ...purchaseTx,
          remainingNumberOfStocksOwned:
            purchaseTx.remainingNumberOfStocksOwned - stocksToSell,
        };
      });

      result.purchaseTransactions = updatedPurchases;
      return result;
    },
    { realizedProfit: 0, purchaseTransactions },
  );

  return realizedProfit;
};
