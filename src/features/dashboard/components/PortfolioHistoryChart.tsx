import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { usePortfolioPerformanceData } from '@/hooks/usePortfolioPerformanceData';
import { HistoricalPriceData } from '@/types/historicalPrices';
import { TimeRange } from './PortfolioHistoryChartCard';
import { DailyPortfolio } from '@/utils/portfolioCalculations/getDailyPortfolio';

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

  const chartData =
    selectedTimeRange === 'Za celou dobu'
      ? allTime
      : selectedTimeRange === 'YTD'
        ? ytd
        : selectedTimeRange === '1M'
          ? oneMonth
          : selectedTimeRange === '1R'
            ? oneYear
            : oneWeek;

  const formatXAxisTick = (dateStr: string, index: number) => {
    const date = new Date(dateStr);

    if (index === 0) {
      return '';
    }

    switch (selectedTimeRange) {
      case 'Za celou dobu':
        return date.getFullYear().toString();
      case '1R':
      case 'YTD':
        return (
          date
            .toLocaleDateString('cs-CZ', { month: 'short' })
            .replace('.', '')
            .charAt(0)
            .toUpperCase() +
          date
            .toLocaleDateString('cs-CZ', { month: 'short' })
            .replace('.', '')
            .slice(1)
        );
      default:
        return `${date.getDate()}.${date.getMonth() + 1}.`;
    }
  };

  const getXAxisProps = () => {
    switch (selectedTimeRange) {
      case 'Za celou dobu':
        return {
          interval: Math.floor(chartData.length / 5),
          minTickGap: 50,
        };
      case '1R':
        return {
          interval: Math.floor(chartData.length / 12),
          minTickGap: 40,
        };
      case 'YTD':
        return {
          interval: Math.floor(chartData.length / 2),
          minTickGap: 30,
        };
      case '1M':
        return {
          interval: Math.floor(chartData.length / 6),
          minTickGap: 30,
        };
      case '1T':
        return {
          interval: Math.floor(chartData.length / 6),
          minTickGap: 20,
        };
      default:
        return {
          interval: 0,
          minTickGap: 30,
        };
    }
  };

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
          tickFormatter={(value, index) => formatXAxisTick(value, index)}
          {...getXAxisProps()}
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
