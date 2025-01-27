import { TimeRange } from '../components/StockCard';

export const getTimeRangeLabel = (range: TimeRange) => {
  const timeRangeMap: Record<string, string> = {
    '1T': 'Za poslední týden',
    '1M': 'Za poslední měsíc',
    '1R': 'Za poslední rok',
    '5R': 'Za posledních 5 let',
    YTD: 'Od začátku roku',
  };

  return timeRangeMap[range];
};
