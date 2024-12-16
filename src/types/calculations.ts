import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';

export type calculationParams = {
  existingTransactions: TransactionTableData[];
  savedTransactions: TransactionTableData[];
};

export type CurrentPortfolioTransaction = TransactionTableData & {
  remainingNumberOfStocksOwned: number;
};

export type CurrentPortfolioItem = {
  id: string;
  holding: { holdingIcon: string; holdingSymbol: string; holdingName: string };
  totalNumberOfStocks: number;
  value: {
    total: number;
    avgPricePerShare: number;
    currency: string;
  };
  totalFees: number;
};
