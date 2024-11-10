import { ArrowUpDown } from 'lucide-react';
import { Button } from './ui/button';
import { Column } from '@tanstack/react-table';

type TableColumnHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  buttonClassName?: string;
  wrapperClassName?: string;
};

export const TableColumnHeader = <TData, TValue>({
  column,
  title,
  buttonClassName = '',
  wrapperClassName = '',
}: TableColumnHeaderProps<TData, TValue>) => {
  return (
    <div className={wrapperClassName}>
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className={buttonClassName}
      >
        {title}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
