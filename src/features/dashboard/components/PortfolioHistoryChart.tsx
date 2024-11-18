import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { chartData } from '../mockData/portfolioHistoryData';

const chartConfig = {
  portfolio_value: {
    label: 'Portfolio value',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

type TimeRange = 'Za celou dobu' | '12M' | 'YTD' | '30D' | '7D';
const timeRanges: TimeRange[] = ['Za celou dobu', '12M', 'YTD', '30D', '7D'];

export const PortfolioHistoryChart = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('30D');

  const handleTimeRangeChange = (range: TimeRange) => {
    setSelectedTimeRange(range);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-center p-0 md:flex-row md:justify-between">
        <div className="px-6 py-6">
          <CardTitle>Vývoj hodnoty portfolia</CardTitle>
        </div>
        <div className="!mt-0 flex flex-wrap justify-center gap-2 px-6 sm:py-6">
          {timeRanges.map((range) => (
            <Button
              key={range}
              onClick={() => handleTimeRangeChange(range)}
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
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[350px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
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
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
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
                  nameKey="portfolio value"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Line
              dataKey="portfolio_value"
              type="monotone"
              stroke={chartConfig.portfolio_value.color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
