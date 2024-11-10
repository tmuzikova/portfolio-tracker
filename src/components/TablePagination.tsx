import { Table } from '@tanstack/react-table';
import { Button } from './ui/button';

type TablePaginationProps<TData> = {
  table: Table<TData>;
};

export const TablePagination = <TData,>({
  table,
}: TablePaginationProps<TData>) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Předchozí
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Další
      </Button>
    </div>
  );
};
