import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';

export const getSortedPurchaseTransactions = (
  transactions: TransactionTableData[],
) => {
  return transactions
    .filter((tx) => tx.transactionType === 'Nákup')
    .sort(
      (a, b) =>
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime(),
    );
};

export const getSortedSaleTransactions = (
  transactions: TransactionTableData[],
) => {
  return transactions
    .filter((tx) => tx.transactionType === 'Prodej')
    .sort(
      (a, b) =>
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime(),
    );
};
