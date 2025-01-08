import { LabelList, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { usePieChartsData } from '@/hooks/usePieChartsData';
import { Loader as LoaderIcon } from 'lucide-react';
import { PieChartDataType } from '@/types/PieCharts';

const generateChartConfig = (data: PieChartDataType[]) => {
  return data.reduce<ChartConfig>((config, item) => {
    config[item.groupProperty] = {
      label: item.holdingName || item.groupProperty,
      color: item.fill,
    };
    return config;
  }, {});
};

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

  const chartConfig = generateChartConfig(chartData);

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
          className="mx-auto aspect-square max-h-[450px] w-full pb-2 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="portfolioShare"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(1)}%)`
              }
              nameKey="groupProperty"
            />
            <ChartLegend
              content={
                <ChartLegendContent
                  payload={chartData.map((item) => ({
                    value: item.holdingName || item.groupProperty,
                    color: item.fill,
                  }))}
                />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
