import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';

export type calculationParams = {
  existingTransactions: TransactionTableData[];
  savedTransactions: TransactionTableData[];
};
