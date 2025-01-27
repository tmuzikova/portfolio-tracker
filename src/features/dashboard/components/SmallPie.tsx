import { Legend, Pie, PieChart } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { PieChartDataType } from '@/hooks/usePieChartsData/types/pieCharts';

type pieProps = {
  chartConfig: ChartConfig;
  chartData: PieChartDataType[];
};

export const SmallPie = ({ chartConfig, chartData }: pieProps) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="h-[350px] w-full [&_.recharts-pie-label-text]:fill-muted-foreground [&_.recharts-pie-label-text]:text-sm [&_.recharts-pie-label-text]:font-medium"
    >
      <PieChart>
        <Pie
          data={chartData}
          paddingAngle={2}
          dataKey="portfolioShare"
          nameKey="groupProperty"
          labelLine={false}
          outerRadius="90%"
          innerRadius="50%"
        />

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
      </PieChart>
    </ChartContainer>
  );
};
