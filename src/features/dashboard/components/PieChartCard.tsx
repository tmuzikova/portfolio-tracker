import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { usePieChartsData } from '@/hooks/usePieChartsData';
import { PieChartDataType } from '@/types/pieCharts';
import { LoadingState } from '@/components/LoadingState';

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
  const { holdingData, sectorData, typeData, dividendData, isLoading } =
    usePieChartsData();

  const chartData =
    selectedType === 'Sektor'
      ? sectorData
      : selectedType === 'Typ aktiva'
        ? typeData
        : selectedType === 'Aktiva'
          ? holdingData
          : dividendData;

  const chartConfig = generateChartConfig(chartData);

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between lg:pb-0">
        <CardTitle>Diverzifikace portfolia</CardTitle>

        <div className="flex gap-2 pb-2 pt-6 lg:pt-0">
          {diversificationTypes.map((type) => (
            <Button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`rounded-md px-4 py-2 text-sm ${
                selectedType === type
                  ? 'text-white'
                  : 'bg-slate-200 text-primary hover:bg-slate-300'
              }`}
            >
              {type}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="flex pb-2">
        <ChartContainer
          config={chartConfig}
          className="max-h-[450px] w-full [&_.recharts-pie-label-text]:fill-muted-foreground [&_.recharts-pie-label-text]:text-sm [&_.recharts-pie-label-text]:font-medium"
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
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
