import { PieChartDataType } from '@/hooks/usePieChartsData/types/pieCharts';
import { DiversificationType } from '../components/PieChartCard';

export const getChartData = (
  selectedType: DiversificationType,
  holdingData: PieChartDataType[],
  sectorData: PieChartDataType[],
  typeData: PieChartDataType[],
  dividendData: PieChartDataType[],
): PieChartDataType[] => {
  const chartDataMap = {
    Sektor: sectorData,
    'Typ aktiva': typeData,
    Aktiva: holdingData,
    Dividendy: dividendData,
  };

  return chartDataMap[selectedType];
};
