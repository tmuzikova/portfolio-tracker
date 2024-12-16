import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';
import { transactionTableDataSchema } from '@/components/AddTransactionForm/transactionTableDataSchema';
import allTransactionJSON from '@/features/transactionTable/mockData/allTransactions.json';

export const getSavedTransactions = () => {
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
    .filter(
      (transaction): transaction is TransactionTableData => !!transaction,
    );

  return savedTransactions;
};
