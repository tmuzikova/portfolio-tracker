import { Pie, PieChart } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { PieChartDataType } from '@/hooks/usePieChartsData/types/pieCharts';

type pieProps = {
  chartConfig: ChartConfig;
  chartData: PieChartDataType[];
};

export const LargePie = ({ chartConfig, chartData }: pieProps) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="h-[450px] w-full [&_.recharts-pie-label-text]:fill-muted-foreground [&_.recharts-pie-label-text]:text-sm [&_.recharts-pie-label-text]:font-medium"
    >
      <PieChart margin={{ bottom: 20 }}>
        <Pie
          data={chartData}
          paddingAngle={2}
          dataKey="portfolioShare"
          nameKey="groupProperty"
          labelLine={false}
          outerRadius="80%"
          innerRadius="40%"
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(1)} %)`
          }
        />
      </PieChart>
    </ChartContainer>
  );
};
