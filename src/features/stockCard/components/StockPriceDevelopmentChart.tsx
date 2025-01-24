import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { HistoricalPriceData } from '@/types/historicalPrices';
import { useStockPriceChartData } from '@/hooks/useStockPriceChartData/useStockPriceChartData';
import { TimeRange } from './StockCard';
import { getXAxisProps } from '../utils/getXAxisProps';
import { formatXAxisTick } from '../utils/formatXAxisTick';
import { TimeRangeButtons } from './TimeRangeButtons';

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

const TIME_RANGES: TimeRange[] = ['5R', '1R', 'YTD', '1M', '1T'];

export const StockPriceDevelopmentChart = ({
  stockPrices,
  selectedTimeRange,
  onTimeRangeChange,
}: StockPriceDevelopmentChartProps) => {
  const { lastWeek, lastMonth, lastYear, ytd, fiveYears } =
    useStockPriceChartData(stockPrices);

  const chartData = {
    '5R': fiveYears,
    '1R': lastYear,
    YTD: ytd,
    '1M': lastMonth,
    '1T': lastWeek,
  }[selectedTimeRange];

  return (
    <Card>
      <CardHeader className="flex flex-col items-center p-0 md:flex-row md:justify-between">
        <div className="px-6 py-6">
          <CardTitle>Vývoj ceny aktiva</CardTitle>
        </div>
        <TimeRangeButtons
          ranges={TIME_RANGES}
          selectedRange={selectedTimeRange}
          onChange={onTimeRangeChange}
        />
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
              tickFormatter={(value, index) =>
                formatXAxisTick(value, index, selectedTimeRange)
              }
              {...getXAxisProps(selectedTimeRange, chartData.length)}
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
