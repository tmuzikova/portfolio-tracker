import { TimeRange } from '../components/StockCard';

export const getXAxisProps = (range: TimeRange, dataLength: number) => {
  const intervals = {
    '5R': Math.floor(dataLength / 5),
    '1R': Math.floor(dataLength / 12),
    YTD: Math.floor(dataLength / 6),
    '1M': Math.floor(dataLength / 6),
    '1T': Math.floor(dataLength / 6),
  };

  return {
    interval: intervals[range] ?? 0,
    minTickGap: range === '5R' ? 50 : range === '1T' ? 20 : 30,
  };
};
