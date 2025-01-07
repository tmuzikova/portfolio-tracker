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
import { usePieChartsData } from '@/hooks/usePieChartsData';
import { Loader as LoaderIcon } from 'lucide-react';

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

type DiversificationType = 'Aktiva' | 'Typ aktiva' | 'Sektor' | 'Dividendy';
const diversificationTypes: DiversificationType[] = [
  'Aktiva',
  'Typ aktiva',
  'Sektor',
  'Dividendy',
];

export const PieChartCard = () => {
  const [selectedType, setSelectedType] =
    useState<DiversificationType>('Aktiva');
  const { holdingData, sectorData, typeData, isLoading } = usePieChartsData();

  const chartData =
    selectedType === 'Sektor'
      ? sectorData
      : selectedType === 'Typ aktiva'
        ? typeData
        : holdingData;

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle>Diverzifikace portfolia</CardTitle>

        <div className="flex gap-2 sm:py-6">
          {diversificationTypes.map((type) => (
            <Button
              key={type}
              onClick={() => setSelectedType(type)}
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
            <ChartTooltip content={<ChartTooltipContent />} />
            <Pie
              data={chartData}
              dataKey="portfolioShare"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(1)}%)`
              }
              nameKey="stock"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
