import { ColumnSort, DataTable } from '@/components/DataTable';
import { useCurrentPortfolioData } from '@/hooks/useCurrentPortfolioData';
import { columns } from './columns/columns';
import { Loader as LoaderIcon } from 'lucide-react';

export const PortfolioPerformanceTable = () => {
  const defaultSorting: ColumnSort = { id: 'portfolioShare', desc: true };

  const { currentPortfolioWithPrices, isLoading } = useCurrentPortfolioData();

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
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
