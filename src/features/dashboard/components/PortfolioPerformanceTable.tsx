import { ColumnSort, DataTable } from '@/components/DataTables/DataTable';
import { useCurrentPortfolioData } from '@/hooks/useCurrentPortfolioData';
import { columns } from './columns/columns';
import { LoadingState } from '@/components/LoadingState';

export const PortfolioPerformanceTable = () => {
  const defaultSorting: ColumnSort = { id: 'portfolioShare', desc: true };

  const { currentPortfolioWithPrices, isLoading } = useCurrentPortfolioData();

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <DataTable
      data={currentPortfolioWithPrices}
      columns={columns}
      headerTitle="Výkon jednotlivých aktiv"
      defaultSorting={defaultSorting}
    />
  );
};
