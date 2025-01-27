import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig } from '@/components/ui/chart';
import { useState, useEffect } from 'react';
import { LoadingState } from '@/components/LoadingState';
import { usePieChartsData } from '@/hooks/usePieChartsData/usePieChartsData';
import { PieChartDataType } from '@/hooks/usePieChartsData/types/pieCharts';
import { DiversificationTypeButtons } from './DiversificationTypeButtons';
import { LargePie } from './LargePie';
import { SmallPie } from './SmallPie';

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

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const chartData =
    selectedType === 'Sektor'
      ? sectorData
      : selectedType === 'Typ aktiva'
        ? typeData
        : selectedType === 'Aktiva'
          ? holdingData
          : dividendData;

  const chartConfig = generateChartConfig(chartData);

  useEffect(() => {
    const updateScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  if (isLoading) {
    return <LoadingState />;
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
        {isLargeScreen ? (
          <LargePie chartConfig={chartConfig} chartData={chartData} />
        ) : (
          <SmallPie chartConfig={chartConfig} chartData={chartData} />
        )}
      </CardContent>
    </Card>
  );
};
