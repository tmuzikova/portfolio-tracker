import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';

export type CurrentPortfolioTransaction = TransactionTableData & {
  remainingNumberOfStocksOwned: number;
};

export type CurrentPortfolioItem = {
  id: string;
  holding: { holdingIcon: string; holdingSymbol: string; holdingName: string };
  sector: string;
  type: {
    isFund: boolean;
    isEtf: boolean;
  };
  totalNumberOfStocks: number;
  value: {
    total: number;
    avgPricePerShare: number;
    currency: string;
  };
  totalFees: number;
};

export type CurrentPortfolioItemWithPriceData = {
  id: string;
  holding: {
    holdingIcon: string;
    holdingSymbol: string;
    holdingName: string;
  };
  sector: string;
  type: {
    isFund: boolean;
    isEtf: boolean;
  };
  totalNumberOfStocks: number;
  purchaseValue: {
    total: number;
    avgPricePerShare: number;
  };
  totalFees: number;
  currentValue: {
    total: number;
    pricePerShare: number;
  };
  profit: {
    absolute: number;
    percentage: number;
  };
  portfolioShare: number;
};
