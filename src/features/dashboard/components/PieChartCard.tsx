import { Legend, Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { useState, useEffect } from 'react';
import { LoadingState } from '@/components/LoadingState';
import { usePieChartsData } from '@/hooks/usePieChartsData/usePieChartsData';
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
        <ChartContainer
          config={chartConfig}
          className={`w-full [&_.recharts-pie-label-text]:fill-muted-foreground [&_.recharts-pie-label-text]:text-sm [&_.recharts-pie-label-text]:font-medium ${
            isLargeScreen ? 'h-[450px]' : 'h-[350px]'
          }`}
        >
          <PieChart margin={{ bottom: !isLargeScreen ? 20 : 0 }}>
            <Pie
              data={chartData}
              paddingAngle={2}
              dataKey="portfolioShare"
              nameKey="groupProperty"
              labelLine={false}
              outerRadius={isLargeScreen ? '80%' : '90%'}
              innerRadius={isLargeScreen ? '40%' : '50%'}
              label={
                isLargeScreen
                  ? ({ name, percent }) =>
                      `${name} (${(percent * 100).toFixed(1)} %)`
                  : undefined
              }
            />
            {!isLargeScreen && (
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                wrapperStyle={{
                  paddingTop: '24px',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
                formatter={(value, entry: any) => {
                  const percentage = entry.payload.portfolioShare.toFixed(1);
                  return `${value} (${percentage}%)`;
                }}
              />
            )}
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
