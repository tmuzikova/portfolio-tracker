import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

//to be replaced with real data
const chartData = [
  { stock: 'AAPL', portfolioShare: 10, fill: '#007aff' },
  { stock: 'MSFT', portfolioShare: 12, fill: '#00a1f1' },
  { stock: 'GOOGL', portfolioShare: 15, fill: '#ea4335' },
  { stock: 'AMZN', portfolioShare: 8, fill: '#ff9900' },
  { stock: 'TSLA', portfolioShare: 20, fill: '#cc0000' },
  { stock: 'NVDA', portfolioShare: 10, fill: '#76b900' },
  { stock: 'KO', portfolioShare: 5, fill: '#f40009' },
  { stock: 'JNJ', portfolioShare: 12, fill: '#6a737b' },
];
const chartConfig = {
  AAPL: { label: 'Apple Inc. (AAPL)', color: '#007aff' },
  MSFT: { label: 'Microsoft Corporation (MSFT)', color: '#00a1f1' },
  GOOGL: { label: 'Alphabet Inc. (GOOGL)', color: '#ea4335' },
  AMZN: { label: 'Amazon.com, Inc. (AMZN)', color: '#ff9900' },
  TSLA: { label: 'Tesla, Inc. (TSLA)', color: '#cc0000' },
  NVDA: { label: 'NVIDIA Corporation (NVDA)', color: '#76b900' },
  KO: { label: 'The Coca-Cola Company (KO)', color: '#f40009' },
  JNJ: { label: 'Johnson & Johnson (JNJ)', color: '#6a737b' },
} satisfies ChartConfig;

const diversificationTypes = ['Aktiva', 'Typ aktiva', 'Sektor', 'Měna', 'Země'];

export const DiversificationCharts = () => {
  const [selectedType, setSelectedType] = useState('Aktiva');

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Diverzifikace portfolia</CardTitle>

        <div className="flex gap-2 sm:py-6">
          {diversificationTypes.map((type) => (
            <Button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`rounded-md px-4 py-2 text-sm ${
                selectedType === type
                  ? 'text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[450px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="portfolioShare"
              label
              nameKey="stock"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
