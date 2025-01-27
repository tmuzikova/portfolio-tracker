import { ChartDataPoint } from '@/hooks/usePortflioPerformanceData/usePortfolioPerformanceData';
import { TimeRange } from '../components/PortfolioHistoryChartCard';

type XAxisConfig = {
  divisor: number;
  minTickGap: number;
};

const timeRangeConfig: Record<TimeRange, XAxisConfig> = {
  'Za celou dobu': {
    divisor: 5,
    minTickGap: 50,
  },
  '1R': {
    divisor: 12,
    minTickGap: 40,
  },
  YTD: {
    divisor: 6,
    minTickGap: 30,
  },
  '1M': {
    divisor: 6,
    minTickGap: 30,
  },
  '1T': {
    divisor: 6,
    minTickGap: 20,
  },
};

export const getXAxisProps = (
  selectedTimeRange: TimeRange,
  chartData: ChartDataPoint[],
) => {
  const config = timeRangeConfig[selectedTimeRange];

  return {
    interval: Math.floor(chartData.length / config.divisor),
    minTickGap: config.minTickGap,
  };
};
