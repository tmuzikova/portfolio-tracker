import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { useState } from 'react';
import { usePieChartsData } from '@/hooks/usePieChartsData/usePieChartsData';
import { Loader as LoaderIcon } from 'lucide-react';
import { PieChartDataType } from '@/hooks/usePieChartsData/types/pieCharts';
import { DiversificationTypeButtons } from './DiversificationTypeButtons';

const generateChartConfig = (data: PieChartDataType[]) => {
  return data.reduce<ChartConfig>((config, item) => {
    config[item.groupProperty] = {
      label: item.holdingName || item.groupProperty,
      color: item.fill,
    };
    return config;
  }, {});
};

export type DiversificationType =
  | 'Aktiva'
  | 'Typ aktiva'
  | 'Sektor'
  | 'Dividendy';

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
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-col items-center lg:flex-row lg:items-start lg:justify-between lg:pb-0">
        <CardTitle>Diverzifikace portfolia</CardTitle>
        <DiversificationTypeButtons
          selectedType={selectedType}
          onSelectType={setSelectedType}
        />
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
