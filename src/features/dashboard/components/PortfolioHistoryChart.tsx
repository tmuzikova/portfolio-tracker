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

//to be replaced with real data
const chartData = [
  { date: '2024-10-01', portfolio_value: 1230.12 },
  { date: '2024-10-02', portfolio_value: 1202.92 },
  { date: '2024-10-03', portfolio_value: 1296.18 },
  { date: '2024-10-04', portfolio_value: 1279.75 },
  { date: '2024-10-05', portfolio_value: 1262.5 },
  { date: '2024-10-06', portfolio_value: 1296.28 },
  { date: '2024-10-07', portfolio_value: 1248.22 },
  { date: '2024-10-08', portfolio_value: 1236.34 },
  { date: '2024-10-09', portfolio_value: 1231.04 },
  { date: '2024-10-10', portfolio_value: 1221.67 },
  { date: '2024-10-11', portfolio_value: 1238.6 },
  { date: '2024-10-12', portfolio_value: 1272.93 },
  { date: '2024-10-13', portfolio_value: 1269.37 },
  { date: '2024-10-14', portfolio_value: 1247.16 },
  { date: '2024-10-15', portfolio_value: 1294.55 },
  { date: '2024-10-16', portfolio_value: 1278.6 },
  { date: '2024-10-17', portfolio_value: 1290.91 },
  { date: '2024-10-18', portfolio_value: 1261.97 },
  { date: '2024-10-19', portfolio_value: 1214.48 },
  { date: '2024-10-20', portfolio_value: 1222.1 },
  { date: '2024-10-21', portfolio_value: 1271.53 },
  { date: '2024-10-22', portfolio_value: 1291.29 },
  { date: '2024-10-23', portfolio_value: 1223.51 },
  { date: '2024-10-24', portfolio_value: 1251.29 },
  { date: '2024-10-25', portfolio_value: 1288.58 },
  { date: '2024-10-26', portfolio_value: 1240.51 },
  { date: '2024-10-27', portfolio_value: 1213.72 },
  { date: '2024-10-28', portfolio_value: 1250.53 },
  { date: '2024-10-29', portfolio_value: 1299.29 },
  { date: '2024-10-30', portfolio_value: 1201.5 },
  { date: '2024-10-31', portfolio_value: 1272.17 },
];

const chartConfig = {
  portfolio_value: {
    label: 'Portfolio value',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

const timeRanges = ['Za celou dobu', '12M', 'YTD', '30D', '7D'];

export const PortfolioHistoryChart = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30D');

  const handleTimeRangeChange = (range: string) => {
    setSelectedTimeRange(range);
    // logic to filter chartData based on the selected range to be added
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
