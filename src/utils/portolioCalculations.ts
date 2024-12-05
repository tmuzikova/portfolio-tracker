import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';
import { transactionTableDataSchema } from '@/components/AddTransactionForm/transactionTableDataSchema';
import allTransactionJSON from '@/features/transactionTable/mockData/allTransactions.json';
import { useTransactionStore } from '@/stores/TransactionStore';

const FX_RATE = 25;

const savedTransactions = allTransactionJSON
  .map((transaction) => {
    const parsedTransactions =
      transactionTableDataSchema.safeParse(transaction);
    if (parsedTransactions.success) {
      return parsedTransactions.data;
    } else {
      console.error(parsedTransactions.error);
      return null;
    }
  })
  .filter((transaction): transaction is TransactionTableData => !!transaction);

export const calculateInvestedAmount = () => {
  const existingTransactions = useTransactionStore(
    (state) => state.transactions,
  );
  const transactions = [...existingTransactions, ...savedTransactions];

  const purchaseTransactions = transactions.filter(
    (tx) => tx.transactionType === 'Nákup',
  );

  const totalInvestedAmountWithFees = purchaseTransactions.reduce((sum, tx) => {
    return (
      sum +
      (tx.transactionValue.total + (tx.transactionFee?.total || 0)) * FX_RATE
    );
  }, 0);
  const totalInvestedAmountNoFees = purchaseTransactions.reduce((sum, tx) => {
    return sum + tx.transactionValue.total * FX_RATE;
  }, 0);

  const investedAmount = {
    withFees: totalInvestedAmountWithFees,
    noFees: totalInvestedAmountNoFees,
  };

  return investedAmount;
};

export const calculateTotalFees = () => {
  const existingTransactions = useTransactionStore(
    (state) => state.transactions,
  );
  const transactions = [...existingTransactions, ...savedTransactions];

  const totalFees = transactions.reduce((sum, tx) => {
    return sum + (tx.transactionFee?.total || 0) * FX_RATE;
  }, 0);

  return totalFees;
};

export const calculateRealizedProfit = () => {
  const existingTransactions = useTransactionStore(
    (state) => state.transactions,
  );
  const transactions = [...existingTransactions, ...savedTransactions];

  // sort transactions by date to ensure FIFO (first in-first out) logic
  const saleTransactions = transactions
    .filter((tx) => tx.transactionType === 'Prodej')
    .sort(
      (a, b) =>
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime(),
    );

  const purchaseTransactions = transactions
    .filter((tx) => tx.transactionType === 'Nákup')
    .sort(
      (a, b) =>
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime(),
    )
    .map((tx) => ({ ...tx, remainingQuantity: tx.numberOfStocks }));

  let realizedProfit = 0;

  saleTransactions.forEach((saleTx) => {
    let remainingToSell = saleTx.numberOfStocks;

    for (const purchaseTx of purchaseTransactions) {
      if (remainingToSell <= 0) break; // all quantities sold
      if (
        purchaseTx.holding.holdingSymbol !== saleTx.holding.holdingSymbol ||
        purchaseTx.remainingQuantity <= 0
      )
        continue; // skip mismatched or fully sold purchases

      //calculate the quantity of stocks to sell
      const soldQuantity = Math.min(
        remainingToSell,
        purchaseTx.remainingQuantity,
      );

      //calculate the realized profit for this sale
      const costBasis =
        purchaseTx.transactionValue.perShare * soldQuantity * FX_RATE;
      const saleValue =
        saleTx.transactionValue.perShare * soldQuantity * FX_RATE;

      realizedProfit += saleValue - costBasis;

      //update the remaining quantity to sell
      purchaseTx.remainingQuantity -= soldQuantity;
      remainingToSell -= soldQuantity;
    }
  });

  return realizedProfit;
};
