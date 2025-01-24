import { TimeRange } from '../components/StockCard';

export const getTimeRangeLabel = (range: TimeRange) => {
  switch (range) {
    case '1T':
      return 'Za poslední týden';
    case '1M':
      return 'Za poslední měsíc';
    case '1R':
      return 'Za poslední rok';
    case 'YTD':
      return 'Od začátku roku';
    default:
      return 'Za posledních 5 let';
  }
};
