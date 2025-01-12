import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';

export type calculationParams = {
  existingTransactions: TransactionTableData[];
  savedTransactions: TransactionTableData[];
};

export type dailyPortfolioCalculationParams = {
  existingTransactions: TransactionTableData[];
  savedTransactions: TransactionTableData[];
  startDate: string;
  endDate: string;
};
