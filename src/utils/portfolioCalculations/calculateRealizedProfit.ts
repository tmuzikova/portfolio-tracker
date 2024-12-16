import {
  calculationParams,
  CurrentPortfolioTransaction,
} from '@/types/calculations';
import {
  getSortedPurchaseTransactions,
  getSortedSaleTransactions,
} from './getSortedTransactions';
import { FX_RATE } from './const/FX_RATE';

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

  let realizedProfit = 0;

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

      const purchaseCost =
        (stocksToSell * purchaseTx.transactionValue.perShare +
          (purchaseTx.transactionFee?.total || 0)) *
        FX_RATE;
      const saleRevenue =
        stocksToSell * saleTx.transactionValue.perShare * FX_RATE;
      const saleFee = (saleTx.transactionFee?.total || 0) * FX_RATE;
      realizedProfit += saleRevenue - purchaseCost - saleFee;

      purchaseTx.remainingNumberOfStocksOwned -= stocksToSell;
      remainingNumberOfStocksToSell -= stocksToSell;
    });
  });

  return realizedProfit;
};
