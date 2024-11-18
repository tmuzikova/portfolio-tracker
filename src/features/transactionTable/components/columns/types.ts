export type TransactionTableData = {
  transactionType: string;
  holding: {
    holdingIcon: string;
    holdingSymbol: string;
    holdingName: string;
  };
  transactionDate: string;
  numberOfStocks: number;
  transactionValue: {
    total: number;
    perShare: number;
    currency: string;
  };
  transactionFee?: {
    total: number;
    currency: string;
  };
};
