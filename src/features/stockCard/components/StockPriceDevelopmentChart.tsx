import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { HistoricalPriceData } from '@/types/historicalPrices';
import { useStockPriceChartData } from '@/hooks/useStockPriceChartData';
import { TimeRange } from './StockCard';

type StockPriceDevelopmentChartProps = {
  stockPrices: HistoricalPriceData;
  selectedTimeRange: TimeRange;
  onTimeRangeChange: (range: TimeRange) => void;
};

const chartConfig = {
  stock_price: {
    label: 'Cena aktiva',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const timeRanges: TimeRange[] = ['5R', '1R', 'YTD', '1M', '1T'];

export const StockPriceDevelopmentChart = ({
  stockPrices,
  selectedTimeRange,
  onTimeRangeChange,
}: StockPriceDevelopmentChartProps) => {
  const { lastWeek, lastMonth, lastYear, ytd, fiveYears } =
    useStockPriceChartData(stockPrices);
  const chartData =
    selectedTimeRange === '5R'
      ? fiveYears
      : selectedTimeRange === '1R'
        ? lastYear
        : selectedTimeRange === 'YTD'
          ? ytd
          : selectedTimeRange === '1M'
            ? lastMonth
            : lastWeek;

  const formatXAxisTick = (dateStr: string, index: number) => {
    const date = new Date(dateStr);

    if (index === 0) {
      return '';
    }

    switch (selectedTimeRange) {
      case '5R':
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
      case '5R':
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
    <Card>
      <CardHeader className="flex flex-col items-center p-0 md:flex-row md:justify-between">
        <div className="px-6 py-6">
          <CardTitle>Vývoj ceny aktiva</CardTitle>
        </div>
        <div className="!mt-0 flex flex-wrap justify-center gap-2 px-6 sm:py-6">
          {timeRanges.map((range) => (
            <Button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`rounded-md px-4 py-2 text-sm ${
                selectedTimeRange === range
                  ? 'text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {range}
            </Button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:py-6">
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
              width={70}
              tickFormatter={(value) => `${value} USD`}
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
              dataKey="stock_price"
              type="monotone"
              fill={chartConfig.stock_price.color}
              fillOpacity={0.4}
              stroke={chartConfig.stock_price.color}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
