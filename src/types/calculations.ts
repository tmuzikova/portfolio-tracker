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

export type CurrentPortfolioTransaction = TransactionTableData & {
  remainingNumberOfStocksOwned: number;
};

export type CurrentPortfolioItem = {
  id: string;
  holding: {
    holdingIcon: string | null;
    holdingSymbol: string;
    holdingName: string;
  };
  totalNumberOfStocks: number;
  value: {
    total: number;
    avgPricePerShare: number;
    currency: string;
  };
  totalFees: number;
};
