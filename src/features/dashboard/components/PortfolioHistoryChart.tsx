import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { usePortfolioPerformanceData } from '@/hooks/usePortflioPerformanceData/usePortfolioPerformanceData';
import { HistoricalPriceData } from '@/types/historicalPrices';
import { TimeRange } from './PortfolioHistoryChartCard';
import { DailyPortfolio } from '@/utils/portfolioCalculations/getDailyPortfolio';
import { formatXAxisTick } from '../utils/formatXAxisTick';
import { getXAxisProps } from '../utils/getXAxisProps';

type PortfolioHistoryChartProps = {
  stockPrices: HistoricalPriceData[];
  dailyPortfolio: DailyPortfolio;
  selectedTimeRange: TimeRange;
};

const chartConfig = {
  portfolio_value: {
    label: 'Hodnota portfolia',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export const PortfolioHistoryChart = ({
  stockPrices,
  dailyPortfolio,
  selectedTimeRange,
}: PortfolioHistoryChartProps) => {
  const { oneWeek, oneMonth, oneYear, ytd, allTime } =
    usePortfolioPerformanceData(dailyPortfolio, stockPrices);

  const chartDataMap = {
    'Za celou dobu': allTime,
    '1R': oneYear,
    YTD: ytd,
    '1M': oneMonth,
    '1T': oneWeek,
  };

  const chartData = chartDataMap[selectedTimeRange];

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[350px] w-full"
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 0,
          right: 12,
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value, index) =>
            formatXAxisTick(value, index, selectedTimeRange)
          }
          {...getXAxisProps(selectedTimeRange, chartData)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          domain={['auto', 'auto']}
          tickFormatter={(value) => `${value} CZK`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[200px]"
              labelFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('cs-CZ', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                });
              }}
            />
          }
        />
        <Area
          dataKey="portfolio_value"
          type="monotone"
          stroke={chartConfig.portfolio_value.color}
          fillOpacity={0.4}
          fill={chartConfig.portfolio_value.color}
        />
      </AreaChart>
    </ChartContainer>
  );
};
