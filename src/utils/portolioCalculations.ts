import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';

const FX_RATE = 25;

type calculationParams = {
  existingTransactions: TransactionTableData[];
  savedTransactions: TransactionTableData[];
};

export const calculateInvestedAmount = ({
  existingTransactions,
  savedTransactions,
}: calculationParams) => {
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

export const calculateTotalFees = ({
  existingTransactions,
  savedTransactions,
}: calculationParams) => {
  const transactions = [...existingTransactions, ...savedTransactions];

  const totalFees = transactions.reduce((sum, tx) => {
    return sum + (tx.transactionFee?.total || 0) * FX_RATE;
  }, 0);

  return totalFees;
};

export const calculateRealizedProfit = ({
  existingTransactions,
  savedTransactions,
}: calculationParams) => {
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
