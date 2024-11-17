export type StockTableData = {
  holding: {
    holdingIcon: string;
    holdingSymbol: string;
    holdingName: string;
  };
  stocksPurchased: number;
  purchaseValue: {
    total: number;
    perShare: number;
  };
  currentValue: {
    total: number;
    perShare: number;
  };
  profit: {
    absolute: number;
    percentage: number;
  };
  portfolioShare: number;
};
